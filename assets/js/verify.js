window.PromptVerify = (function () {
  function $(id) { return document.getElementById(id); }

  function init() {
    var form = $('verifyForm');
    if (!form) return;
    form.addEventListener('submit', function (e) {
      e.preventDefault();
      handleSubmit();
    });
  }

  function handleSubmit() {
    var situation = $('situation').value.trim();
    var prompt = $('prompt').value.trim();
    var model = $('model').value;
    var err = $('inputError');

    if (!situation || !prompt) {
      err.hidden = false;
      err.textContent = '현재 업무 상황과 프롬프트를 모두 입력해주세요.';
      return;
    }

    err.hidden = true;
    err.textContent = '';

    updateDummyResult(situation, prompt, model);
  }

  // 현재 검증 UI는 베타 데모 상태입니다.
  // 추후 데이터 기반 검증 및 LLM API 연동으로 실제 결과를 제공할 계획입니다.
  function updateDummyResult(situation, prompt, model) {
    // 간단한 더미 로직: 프롬프트 길이에 따라 결과를 나눔
    var len = prompt.length;
    var scoreEl = $('scoreValue');
    var roleEl = $('diag-role');
    var contextEl = $('diag-context');
    var formatEl = $('diag-format');
    var exampleEl = $('diag-example');
    var beforeBox = $('beforeBox');

    if (len <= 20) {
      scoreEl.textContent = '28 / 100';
      roleEl.textContent = '미정의';
      contextEl.textContent = '부족';
      formatEl.textContent = '없음';
      exampleEl.textContent = '없음';
    } else {
      scoreEl.textContent = '91 / 100';
      roleEl.textContent = '정의됨';
      contextEl.textContent = '충분';
      formatEl.textContent = '명시됨';
      exampleEl.textContent = '포함됨(일부)';
    }

    // Before: 사용자가 입력한 프롬프트 표시
    beforeBox.textContent = prompt || '(비어 있음)';

    // 스크롤을 결과 영역으로 이동
    var resultPanel = document.querySelector('.result-panel');
    if (resultPanel) resultPanel.scrollIntoView({ behavior: 'smooth' });
  }

  document.addEventListener('DOMContentLoaded', init);

  return { init: init, updateDummyResult: updateDummyResult };
})();
