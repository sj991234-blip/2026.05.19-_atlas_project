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
      card.setAttribute('tabindex', '0');
      card.setAttribute('role', 'button');
      card.setAttribute('aria-selected', item.id === selectedId ? 'true' : 'false');

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
      card.setAttribute('tabindex', '0');
      card.setAttribute('role', 'button');
      card.setAttribute('aria-selected', item.id === selectedId ? 'true' : 'false');

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

  function renderVerificationCards(items, selectedId) {
    var container = document.getElementById('verificationCardGrid');
    if (!container) return;
    container.innerHTML = '';

    if (!items || items.length === 0) {
      container.innerHTML = '<div class="empty-state"><p>검증 관련 프롬프트가 없습니다.</p></div>';
      return;
    }

    items.forEach(function (item) {
      var card = document.createElement('article');
      card.className = 'card verification-card' + (item.id === selectedId ? ' active' : '');
      card.dataset.cardId = item.id;
      card.setAttribute('tabindex', '0');
      card.setAttribute('role', 'button');
      card.setAttribute('aria-selected', item.id === selectedId ? 'true' : 'false');

      var title = document.createElement('h3');
      title.className = 'card-title';
      title.textContent = item.title;

      var description = document.createElement('p');
      description.className = 'card-description';
      description.textContent = item.description;

      var meta = document.createElement('div');
      meta.className = 'card-meta';

      var badge = document.createElement('span');
      badge.className = 'card-pill';
      badge.textContent = item.level;
      meta.appendChild(badge);

      card.appendChild(title);
      card.appendChild(description);
      card.appendChild(meta);
      container.appendChild(card);
    });
  }

  function renderCategoryAccordion(items, categories, selectedCategory) {
    var container = document.getElementById('categoryAccordion');
    if (!container) return;
    container.innerHTML = '';

    categories.forEach(function (category) {
      var item = items.find(function (it) { return it.category === category; }) || {};
      var isActive = selectedCategory === category;

      var block = document.createElement('article');
      block.className = 'accordion-item' + (isActive ? ' active' : '');

      var header = document.createElement('button');
      header.type = 'button';
      header.className = 'accordion-trigger';
      header.dataset.categoryName = category;
      header.setAttribute('aria-expanded', isActive ? 'true' : 'false');
      header.textContent = category;

      var description = document.createElement('p');
      description.className = 'accordion-description';
      description.textContent = item.description || '해당 카테고리의 대표 프롬프트를 확인해 보세요.';
      if (!isActive) {
        description.hidden = true;
      }

      block.appendChild(header);
      block.appendChild(description);
      container.appendChild(block);
    });
  }

  function generateExamplePrompt(prompt) {
    var sampleMap = {
      role: '연구 기획자',
      task: '시장 분석 보고서 작성',
      context: '신제품 출시 배경',
      format: '표와 요약',
      example: '예시 결과',
      constraint: '500자 이내',
      topic: 'AI 기반 추천 시스템',
      audience: '제품 기획자',
      content: '프로젝트 개요와 일정',
      objective: '핵심 성과 지표 도출',
      draft: '첫 번째 초안 텍스트',
      population: '성인 환자',
      intervention: '새로운 치료법',
      comparison: '기존 치료법',
      outcome: '효과 평가',
      time: '6개월',
      user_question: '이 제품의 핵심 기능을 설명해 주세요.',
      request_text: '사용자 대상 소개 문장',
      presentation_topic: 'AI 도입 전략'
    };

    var used = false;
    var result = prompt.replace(/\{([^}]+)\}|\[([^\]]+)\]/g, function (match, key1, key2) {
      var key = (key1 || key2 || '').trim().toLowerCase();
      var sample = sampleMap[key] || '예시 텍스트';
      used = true;
      return sample;
    });

    return used ? result : '프롬프트 예시 입력은 템플릿 변수({})를 포함해야 생성됩니다.';
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
    document.getElementById('detailExample').textContent = generateExamplePrompt(item.prompt);
    document.getElementById('detailNotes').textContent = item.notes;

    var badges = document.getElementById('detailBadges');
    badges.innerHTML = '';
    var badge = document.createElement('span');
    badge.className = 'badge';
    badge.textContent = item.level;
    badges.appendChild(badge);

    var sources = document.getElementById('detailSources');
    sources.innerHTML = '';
    if (Array.isArray(item.sources)) {
      item.sources.forEach(function (source) {
        var li = document.createElement('li');
        li.textContent = source;
        sources.appendChild(li);
      });
    } else if (item.sources) {
      var li = document.createElement('li');
      li.textContent = String(item.sources);
      sources.appendChild(li);
    }
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
    renderVerificationCards: renderVerificationCards,
    renderCategoryAccordion: renderCategoryAccordion,
    renderDetail: renderDetail,
    renderSummary: renderSummary,
    renderEmptyState: renderEmptyState
  };
})();
