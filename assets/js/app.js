window.PromptAtlasApp = (function (data, render) {
  var state = {
    categories: data.categories,
    selectedCategory: 'All',
    selectedLevel: 'All',
    searchTerm: '',
    selectedItemId: null
  };

  function init() {
    // render.renderSidebar will be triggered only when a top-category is selected
    render.renderFilters(data.levels, data.models, state);
    renderTopCategoryButtons(state.categories);
    attachEventListeners();
    refresh();
  }

  function renderTopCategoryButtons(categories) {
    var container = document.getElementById('topCategoryButtons');
    if (!container) return;
    container.innerHTML = '';
    categories.forEach(function (category) {
      var btn = document.createElement('button');
      btn.type = 'button';
      btn.className = 'top-cat-button';
      btn.textContent = category;
      btn.dataset.category = category;
      btn.addEventListener('click', function () {
        state.selectedCategory = category;
        state.searchTerm = '';
        var searchInput = document.getElementById('searchInput');
        if (searchInput) searchInput.value = '';
        showSidebarCategory(category);
        render.renderFilters(data.levels, data.models, state);
        refresh();
      });
      container.appendChild(btn);
    });
  }

  function showSidebarCategory(category) {
    var container = document.getElementById('sidebarNav');
    if (!container) return;
    container.classList.remove('hidden');
    container.innerHTML = '';
    var button = document.createElement('button');
    button.type = 'button';
    button.textContent = category;
    button.dataset.category = category;
    button.className = 'active';
    container.appendChild(button);
  }

  function attachEventListeners() {
    var searchInput = document.getElementById('searchInput');
    if (searchInput) {
      searchInput.addEventListener('input', function (event) {
        state.searchTerm = event.target.value.trim();
        refresh();
      });
    }

    var categoryFilters = document.getElementById('categoryFilters');
    if (categoryFilters) categoryFilters.addEventListener('click', handleFilterClick);

    var levelFilters = document.getElementById('levelFilters');
    if (levelFilters) levelFilters.addEventListener('click', handleFilterClick);

    var sidebarNav = document.getElementById('sidebarNav');
    if (sidebarNav) {
      sidebarNav.addEventListener('click', function (event) {
        var button = event.target.closest('button');
        if (!button || !button.dataset.category) return;
        state.selectedCategory = button.dataset.category;
        state.searchTerm = '';
        if (searchInput) searchInput.value = '';
        render.renderSidebar(state.categories, state.selectedCategory);
        render.renderFilters(data.levels, data.models, state);
        refresh();
      });
    }

    var sidebarWorkflow = document.getElementById('sidebarWorkflow');
    if (sidebarWorkflow) {
      sidebarWorkflow.addEventListener('click', function (event) {
        var button = event.target.closest('button');
        if (!button || !button.dataset.category) return;
        state.selectedCategory = button.dataset.category;
        state.searchTerm = '';
        if (searchInput) searchInput.value = '';
        render.renderSidebar(state.categories, state.selectedCategory);
        render.renderFilters(data.levels, data.models, state);
        refresh();
      });
    }

    var cardGrid = document.getElementById('cardGrid');
    if (cardGrid) {
      cardGrid.addEventListener('click', function (event) {
        var card = event.target.closest('[data-card-id]');
        if (!card) return;
        state.selectedItemId = card.dataset.cardId;
        refresh();
      });

      cardGrid.addEventListener('keydown', function (event) {
        if (event.key === 'Enter' || event.key === ' ') {
          var card = event.target.closest('[data-card-id]');
          if (!card) return;
          state.selectedItemId = card.dataset.cardId;
          refresh();
        }
      });
    }

    var workflowCardGrid = document.getElementById('workflowCardGrid');
    if (workflowCardGrid) {
      workflowCardGrid.addEventListener('click', function (event) {
        var card = event.target.closest('[data-card-id]');
        if (!card) return;
        state.selectedItemId = card.dataset.cardId;
        refresh();
      });

      workflowCardGrid.addEventListener('keydown', function (event) {
        if (event.key === 'Enter' || event.key === ' ') {
          var card = event.target.closest('[data-card-id]');
          if (!card) return;
          state.selectedItemId = card.dataset.cardId;
          refresh();
        }
      });
    }

    var copyPromptButton = document.getElementById('copyPromptButton');
    if (copyPromptButton) {
      copyPromptButton.addEventListener('click', function () {
        var selected = getSelectedItem();
        if (!selected) return;
        copyText(selected.prompt);
      });
    }
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

    render.renderFilters(data.levels, data.models, state);
    refresh();
  }

  function getFilteredItems() {
    var term = state.searchTerm.toLowerCase();

    return data.items.filter(function (item) {
      var matchesCategory = state.selectedCategory === 'All' || item.category === state.selectedCategory;
      var matchesLevel = state.selectedLevel === 'All' || item.level === state.selectedLevel;
      var matchesSearch = !term || [item.title, item.description, item.prompt, item.category, item.level, item.tags.join(' '), item.sources.join(' ')].some(function (field) {
        return field.toLowerCase().includes(term);
      });
      return matchesCategory && matchesLevel && matchesSearch;
    });
  }

  function refresh() {
    var filteredItems = getFilteredItems();
    render.renderWorkflowCards(data.items.filter(function (item) { return item.category === '워크플로우'; }), state.selectedItemId);
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
