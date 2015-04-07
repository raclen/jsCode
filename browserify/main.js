/**
 * Created by XIAODI001 on 2015/4/2.
 * 这是一个新代码
 */
var app =require('./app.js');
var p = document.createElement('p');
p.textContent = app.get(); // -> 'feenan'
document.body.appendChild(p);