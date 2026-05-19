window.PromptAtlasRender = (function () {
  function createButton(label, type, active) {
    var button = document.createElement('button');
    button.type = 'button';
    button.className = 'filter-chip' + (active ? ' active' : '');
    button.dataset.filterType = type;
    button.textContent = label;
    return button;
  }

  function renderSidebar(categories, selectedCategory) {
    var container = document.getElementById('sidebarNav');
    container.innerHTML = '';

    categories.forEach(function (category) {
      var button = document.createElement('button');
      button.type = 'button';
      button.textContent = category;
      button.dataset.category = category;
      if (category === selectedCategory) {
        button.classList.add('active');
      }
      container.appendChild(button);
    });
  }

  function renderFilters(levels, models, state) {
    var categoryContainer = document.getElementById('categoryFilters');
    var levelContainer = document.getElementById('levelFilters');

    categoryContainer.innerHTML = '';
    levelContainer.innerHTML = '';

    var clearCategory = createButton('전체 카테고리', 'category', state.selectedCategory === 'All');
    clearCategory.dataset.filterValue = 'All';
    categoryContainer.appendChild(clearCategory);

    state.categories.forEach(function (category) {
      var active = state.selectedCategory === category;
      var button = createButton(category, 'category', active);
      button.dataset.filterValue = category;
      categoryContainer.appendChild(button);
    });

    var clearLevel = createButton('전체 레벨', 'level', state.selectedLevel === 'All');
    clearLevel.dataset.filterValue = 'All';
    levelContainer.appendChild(clearLevel);

    levels.forEach(function (level) {
      var active = state.selectedLevel === level;
      var button = createButton(level, 'level', active);
      button.dataset.filterValue = level;
      levelContainer.appendChild(button);
    });
  }

  function renderCards(items, selectedId) {
    var container = document.getElementById('cardGrid');
    container.innerHTML = '';

    items.forEach(function (item) {
      var card = document.createElement('article');
      card.className = 'card' + (item.id === selectedId ? ' active' : '');
      card.dataset.cardId = item.id;

      var title = document.createElement('h3');
      title.className = 'card-title';
      title.textContent = item.title;

      var description = document.createElement('p');
      description.className = 'card-description';
      description.textContent = item.description;

      var meta = document.createElement('div');
      meta.className = 'card-meta';

      var category = document.createElement('span');
      category.className = 'card-pill';
      category.textContent = item.category;

      var level = document.createElement('span');
      level.className = 'card-pill';
      level.textContent = item.level;

      meta.appendChild(category);
      meta.appendChild(level);
      card.appendChild(title);
      card.appendChild(description);
      card.appendChild(meta);
      container.appendChild(card);
    });
  }

  function renderWorkflowCards(items, selectedId) {
    var container = document.getElementById('workflowCardGrid');
    if (!container) return;
    container.innerHTML = '';

    items.forEach(function (item) {
      var card = document.createElement('article');
      card.className = 'card' + (item.id === selectedId ? ' active' : '');
      card.dataset.cardId = item.id;

      var title = document.createElement('h3');
      title.className = 'card-title';
      title.textContent = item.title;

      var description = document.createElement('p');
      description.className = 'card-description';
      description.textContent = item.description;

      var meta = document.createElement('div');
      meta.className = 'card-meta';

      var category = document.createElement('span');
      category.className = 'card-pill';
      category.textContent = item.category;

      var level = document.createElement('span');
      level.className = 'card-pill';
      level.textContent = item.level;

      meta.appendChild(category);
      meta.appendChild(level);
      card.appendChild(title);
      card.appendChild(description);
      card.appendChild(meta);
      container.appendChild(card);
    });
  }

  function renderDetail(item) {
    var detailContent = document.getElementById('detailContent');
    var detailEmpty = document.getElementById('detailEmpty');
    if (!item) {
      detailContent.hidden = true;
      detailEmpty.hidden = false;
      return;
    }

    detailEmpty.hidden = true;
    detailContent.hidden = false;

    document.getElementById('detailCategory').textContent = item.category;
    document.getElementById('detailTitle').textContent = item.title;
    document.getElementById('detailDescription').textContent = item.description;
    document.getElementById('detailPrompt').textContent = item.prompt;
    document.getElementById('detailNotes').textContent = item.notes;

    var badges = document.getElementById('detailBadges');
    badges.innerHTML = '';
    var badge = document.createElement('span');
    badge.className = 'badge';
    badge.textContent = item.level;
    badges.appendChild(badge);

    var sources = document.getElementById('detailSources');
    sources.innerHTML = '';
    item.sources.forEach(function (source) {
      var li = document.createElement('li');
      li.textContent = source;
      sources.appendChild(li);
    });
  }

  function renderSummary(total) {
    var summary = document.getElementById('resultsSummary');
    summary.textContent = total + '개 항목';
  }

  function renderEmptyState(show) {
    document.getElementById('emptyState').hidden = !show;
  }

  return {
    renderSidebar: renderSidebar,
    renderFilters: renderFilters,
    renderCards: renderCards,
    renderWorkflowCards: renderWorkflowCards,
    renderDetail: renderDetail,
    renderSummary: renderSummary,
    renderEmptyState: renderEmptyState
  };
})();
