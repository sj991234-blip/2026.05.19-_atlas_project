window.PromptAtlasApp = (function (data, render) {
  data = data || window.PromptAtlasData || null;
  var state = {
    categories: (data && data.categories) || [],
    selectedCategory: 'All',
    selectedLevel: 'All',
    searchTerm: '',
    selectedItemId: null
  };

  function init() {
    ensureData(function (loaded) {
      data = loaded;
      state.categories = data.categories || [];
      // render.renderSidebar will be triggered only when a top-category is selected
      render.renderFilters(data.levels || [], data.models || [], state);
      renderTopCategoryButtons(state.categories);
      attachEventListeners();
      refresh();
    });
  }

  function ensureData(cb) {
    if (window.PromptAtlasData) return cb(window.PromptAtlasData);
    fetch('./assets/data/prompt-atlas.json')
      .then(function (res) { return res.json(); })
      .then(function (json) {
        window.PromptAtlasData = json;
        clearAppError();
        cb(json);
      })
      .catch(function (err) {
        console.error('Failed to load PromptAtlas data', err);
        showAppError('프롬프트 데이터를 불러오는 데 실패했습니다. 페이지를 새로고침하거나 나중에 다시 시도하세요.');
        cb(window.PromptAtlasData || { categories: [], levels: [], models: [], items: [] });
      });
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
      btn.setAttribute('aria-pressed', 'false');
      btn.addEventListener('click', function () {
        var currently = state.selectedCategory;
        var searchInput = document.getElementById('searchInput');
        // Toggle: if same category clicked again, deselect and hide sidebar
        if (currently === category) {
          state.selectedCategory = 'All';
          if (searchInput) searchInput.value = '';
          hideSidebar();
        } else {
          state.selectedCategory = category;
          if (searchInput) searchInput.value = '';
          showSidebarCategory(category);
        }
        // update aria-pressed on buttons
        Array.prototype.forEach.call(container.querySelectorAll('.top-cat-button'), function (b) {
          b.setAttribute('aria-pressed', b.dataset.category === state.selectedCategory ? 'true' : 'false');
        });
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

  function getAppErrorElement() {
    return document.getElementById('appError');
  }

  function showAppError(message) {
    var errorElement = getAppErrorElement();
    if (!errorElement) return;
    errorElement.textContent = message;
    errorElement.hidden = false;
  }

  function clearAppError() {
    var errorElement = getAppErrorElement();
    if (!errorElement) return;
    errorElement.textContent = '';
    errorElement.hidden = true;
  }

  function openVerifyPopup() {
    window.open('verify.html', 'promptVerify', 'width=1000,height=800');
  }

  function bindVerifyLinks() {
    var links = document.querySelectorAll('.js-open-verify');
    links.forEach(function (link) {
      link.addEventListener('click', function (event) {
        event.preventDefault();
        openVerifyPopup();
      });
    });
  }

  function hideSidebar() {
    var container = document.getElementById('sidebarNav');
    if (!container) return;
    container.classList.add('hidden');
    container.innerHTML = '';
  }

  function attachEventListeners() {
    var searchInput = document.getElementById('searchInput');
    if (searchInput) {
      searchInput.addEventListener('input', function (event) {
        state.searchTerm = event.target.value.trim();
        refresh();
      });
    }

    bindVerifyLinks();

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

    var categoryAccordion = document.getElementById('categoryAccordion');
    if (categoryAccordion) {
      categoryAccordion.addEventListener('click', function (event) {
        var button = event.target.closest('[data-category-name]');
        if (!button) return;
        var category = button.dataset.categoryName;
        state.selectedCategory = category;
        state.searchTerm = '';
        var searchInput = document.getElementById('searchInput');
        if (searchInput) searchInput.value = '';
        var firstItem = data.items.find(function (item) { return item.category === category; });
        if (firstItem) {
          state.selectedItemId = firstItem.id;
        }
        render.renderFilters(data.levels, data.models, state);
        refresh();
      });
    }

    var copyPromptButton = document.getElementById('copyPromptButton');
    if (copyPromptButton) {
      copyPromptButton.addEventListener('click', async function () {
        var targetId = copyPromptButton.getAttribute('data-target');
        var targetElement = targetId ? document.getElementById(targetId) : null;
        if (!targetElement) return;

        var textToCopy = targetElement.innerText;
        var originalText = copyPromptButton.innerHTML;

        try {
          if (navigator.clipboard && navigator.clipboard.writeText) {
            await navigator.clipboard.writeText(textToCopy);
          } else {
            fallbackCopy(textToCopy);
          }

          copyPromptButton.innerHTML = '✅ 복사 완료!';
          copyPromptButton.style.color = '#10b981';
          copyPromptButton.style.fontWeight = '600';

          setTimeout(function () {
            copyPromptButton.innerHTML = originalText;
            copyPromptButton.style.color = '';
            copyPromptButton.style.fontWeight = '';
          }, 2000);
        } catch (err) {
          console.error('클립보드 복사에 실패했습니다:', err);
          copyPromptButton.innerHTML = '복사 실패';
          copyPromptButton.style.color = '#dc2626';
          setTimeout(function () {
            copyPromptButton.innerHTML = originalText;
            copyPromptButton.style.color = '';
          }, 2000);
        }
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
    var items = (data && data.items) || [];
    return items.filter(function (item) {
      var matchesCategory = state.selectedCategory === 'All' || item.category === state.selectedCategory;
      var matchesLevel = state.selectedLevel === 'All' || item.level === state.selectedLevel;
      var hay = [item.title, item.description, item.prompt, item.category, item.level];
      if (Array.isArray(item.tags)) hay.push(item.tags.join(' '));
      if (Array.isArray(item.sources)) hay.push(item.sources.join(' '));
      var matchesSearch = !term || hay.some(function (field) {
        return (field || '').toString().toLowerCase().includes(term);
      });
      return matchesCategory && matchesLevel && matchesSearch;
    });
  }

  function refresh() {
    var filteredItems = getFilteredItems();
    render.renderCategoryAccordion(data.items, state.categories, state.selectedCategory);
    render.renderWorkflowCards(data.items.filter(function (item) { return item.category === '워크플로우'; }), state.selectedItemId);
    render.renderVerificationCards(data.items.filter(function (item) { return item.category === '검증'; }), state.selectedItemId);
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
