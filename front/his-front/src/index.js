import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import store from './redux/store.js';
import Pages from './pages/PagiNavigation';
import $ from 'jquery';
window.$ = $;


// 브라우저 종료 시 로그인한 유저의 토큰값 로컬 스토리지에서 삭제
// 유저가 window 사용 시에는 window가 닫힌 것이 아니다.
var closing_window = false;
$(window).on('focus', function () {
  closing_window = false;
});

$(window).on('blur', function () {
  closing_window = true;
  if (!document.hidden) { // window가 최소화된 것은 닫힌 것이 아니다.
    closing_window = false;
  }
  $(window).on('resize', function (e) { // window가 최대화된 것은 닫힌 것이 아니다.
    closing_window = false;
  });
  $(window).off('resize'); // multiple listening 회피
});

// 유저가 html을 나간다면 window가 닫힌 것으로 간주
$('html').on('mouseleave', function () {
  closing_window = true;
});

// 유저의 마우스가 window 안에 있다면 토큰들을 삭제하지 않음
$('html').on('mouseenter', function () {
  closing_window = false;
});

$(document).on('keydown', function (e) {
  if (e.keyCode === 91 || e.keyCode === 18) {
    closing_window = false; // 단축키 ALT+TAB (창 변경)
  }
  if (e.keyCode === 116 || (e.ctrlKey && e.keyCode === 82)) {
    closing_window = false; // 단축키 F5, CTRL+F5, CTRL+R (새로고침)
  }
});

// a 링크를 눌렀을 때 토큰값 삭제 방지
$(document).on("click", "a", function () {
  closing_window = false;
});

// 버튼이 다른 페이지로 redirect한다면 토큰값 삭제 방지
$(document).on("click", "button", function () {
  closing_window = false;
});

// submit이나 form 사용 시 토큰값 삭제 방지
$(document).on("submit", "form", function () {
  closing_window = false;
});

// toDoWhenClosing 함수를 통해 window가 닫히면 토큰 관련 값 전부 삭제
var toDoWhenClosing = function () {
  localStorage.removeItem('jwt')
  localStorage.removeItem('role')
  localStorage.removeItem('name')
  localStorage.removeItem('empIdPk')
  localStorage.removeItem('userName')
  localStorage.removeItem('specialityName')
  return;
};

// unload(window가 닫히는 이벤트)가 감지되면 closing_window가 true가 되고 토큰 관련 값들 전부 삭제
window.addEventListener("unload", function (e) {
  if (closing_window) {
    toDoWhenClosing();
  }
});

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <Provider store={store}>
      <Pages />
  </Provider>
);
