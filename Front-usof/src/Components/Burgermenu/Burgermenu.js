import React from 'react';
import $ from 'jquery';


// export default class App extends React.Component {
//     componentDidMount() {
//          // Jquery here $(...)...
//          $('.burger-menu').click(function (e) {
//             e.preventDefault();
//             $(this).toggleClass('menu-btn_active')
//          })
// //
//      }
//
//      // ...
//  }
$('.menu-btn').click(function (e) {
    e.preventDefault();
    $(this).toggleClass('menu-btn_active')
    $('.menu-nav').toggleClass('menu-nav_active');
})
