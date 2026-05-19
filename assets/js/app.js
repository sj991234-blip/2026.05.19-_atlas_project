window.PromptAtlasApp = (function (data, render) {
  var state = {
    categories: data.categories,
    selectedCategory: 'All',
    selectedLevel: 'All',
    selectedModel: 'All',
    searchTerm: '',
    selectedItemId: null
  };

  function init() {
    render.renderSidebar(state.categories, state.selectedCategory);
    render.renderFilters(data.levels, data.models, state);
    attachEventListeners();
    refresh();
  }

  function attachEventListeners() {
    document.getElementById('searchInput').addEventListener('input', function (event) {
      state.searchTerm = event.target.value.trim();
      refresh();
    });

    document.getElementById('categoryFilters').addEventListener('click', handleFilterClick);
    document.getElementById('levelFilters').addEventListener('click', handleFilterClick);
    document.getElementById('modelFilters').addEventListener('click', handleFilterClick);

    document.getElementById('sidebarNav').addEventListener('click', function (event) {
      var button = event.target.closest('button');
      if (!button || !button.dataset.category) return;
      state.selectedCategory = button.dataset.category;
      state.searchTerm = '';
      document.getElementById('searchInput').value = '';
      render.renderSidebar(state.categories, state.selectedCategory);
      render.renderFilters(data.levels, data.models, state);
      refresh();
    });

    document.getElementById('cardGrid').addEventListener('click', function (event) {
      var card = event.target.closest('[data-card-id]');
      if (!card) return;
      state.selectedItemId = card.dataset.cardId;
      refresh();
    });

    document.getElementById('copyPromptButton').addEventListener('click', function () {
      var selected = getSelectedItem();
      if (!selected) return;
      copyText(selected.prompt);
    });
  }

  function handleFilterClick(event) {
    var button = event.target.closest('button');
    if (!button || !button.dataset.filterType) return;

    var type = button.dataset.filterType;
    var value = button.dataset.filterValue;

    if (type === 'category') {
      state.selectedCategory = value;
    }
    if (type === 'level') {
      state.selectedLevel = value;
    }
    if (type === 'model') {
      state.selectedModel = value;
    }

    render.renderFilters(data.levels, data.models, state);
    refresh();
  }

  function getFilteredItems() {
    var term = state.searchTerm.toLowerCase();

    return data.items.filter(function (item) {
      var matchesCategory = state.selectedCategory === 'All' || item.category === state.selectedCategory;
      var matchesLevel = state.selectedLevel === 'All' || item.level === state.selectedLevel;
      var matchesModel = state.selectedModel === 'All' || item.model === state.selectedModel;
      var matchesSearch = !term || [item.title, item.description, item.prompt, item.category, item.model, item.level, item.tags.join(' '), item.sources.join(' ')].some(function (field) {
        return field.toLowerCase().includes(term);
      });
      return matchesCategory && matchesLevel && matchesModel && matchesSearch;
    });
  }

  function refresh() {
    var filteredItems = getFilteredItems();
    render.renderCards(filteredItems, state.selectedItemId);
    render.renderSummary(filteredItems.length);
    render.renderEmptyState(filteredItems.length === 0);

    if (!filteredItems.some(function (item) { return item.id === state.selectedItemId; })) {
      state.selectedItemId = filteredItems.length > 0 ? filteredItems[0].id : null;
    }

    render.renderCards(filteredItems, state.selectedItemId);
    render.renderDetail(getSelectedItem());
  }

  function getSelectedItem() {
    return data.items.find(function (item) { return item.id === state.selectedItemId; }) || null;
  }

  function copyText(text) {
    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard.writeText(text).catch(function () {
        fallbackCopy(text);
      });
    } else {
      fallbackCopy(text);
    }
  }

  function fallbackCopy(text) {
    var textarea = document.createElement('textarea');
    textarea.value = text;
    textarea.setAttribute('readonly', '');
    textarea.style.position = 'absolute';
    textarea.style.left = '-9999px';
    document.body.appendChild(textarea);
    textarea.select();
    document.execCommand('copy');
    document.body.removeChild(textarea);
  }

  return {
    init: init
  };
})(window.PromptAtlasData, window.PromptAtlasRender);

window.addEventListener('DOMContentLoaded', function () {
  window.PromptAtlasApp.init();
});
