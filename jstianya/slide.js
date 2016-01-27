function slide() {
    return this.init.apply(this, arguments);
}
slide.prototype = {
    init: function (opts) {
        var opt = this.extend({
            outerID: 'box',
            textBoxID: 'text',
            prev: 'prev',
            next: 'next',
            disNum: 9,//默认显示个数
            sacle: 0.8,//缩放比例
            width: 300,//原始图片宽度
            height: 400,//原始图片高度
            auto: false,//是否自动切换
            timer: 5000//自动切换时间间隔
        }, opts || {});
        var _this = this;
        this.opt = opt;
        this.outer = this.$(opt.outerID);
        this.prev = this.$(opt.prev);
        this.next = this.$(opt.next);
        this.oUl = this.outer.getElementsByTagName('ul')[0];
        this.lis = this.oUl.getElementsByTagName('li');
        this.text = document.getElementById(opt.textBoxID).getElementsByTagName('div');
        this.len = this.lis.length;
        this.outerWidth = this.outer.offsetWidth;
        this.iCenter = Math.floor(opt.disNum / 2);
        this.space = Math.round((this.outerWidth - opt.width) / (opt.disNum - 1));//(1000-300)(9-1)
        this.iSort = [];
        this.tSort = [];
        this.property = [];
        this.timer = null;
        this.sliding = false;
        this.p = {'width': 50, 'height': 50, 'top': opt.height / 2, 'left': this.outerWidth / 2, 'zIndex': 0};
        this.cretaeProperty();
        for (var i = 0; i < this.len; i++) {
            this.iSort.push(this.lis[i]), this.tSort.push(this.text[i])
        }
        ;
        this.iSort.unshift(this.iSort.pop());
        this.tSort.unshift(this.tSort.pop());
        if (opt.auto) {
            this.timer = setInterval(function () {
                _this.doNext();
            }, opt.timer);
        }
        this.itemHandler();
        this.outerHandler();
        this.slider();
        this.prev.onclick = function () {
            _this.doPrev();
        }
        this.next.onclick = function () {
            _this.doNext();
        }
    },
    outerHandler: function () {
        var _this = this, opt = this.opt;
        this.outer.onmouseover = function () {
            if (_this.timer) clearInterval(_this.timer);
        };
        this.outer.onmouseout = function () {
            if (opt.auto) {
                _this.timer = setInterval(function () {
                    _this.doNext();
                }, opt.timer);
            }
        }
    },
    itemHandler: function () {
        var opt = this.opt, _this = this;
        for (var i = 0; i < this.len; i++) {
            (function (i) {
                _this.iSort[i].onclick = function () {
                    if (_this.sliding) return;
                    _this.sliding = true;
                    var m = this.index - 1;
                    if (m < _this.iCenter) {
                        for (var k = 0; k < _this.iCenter - m; k++) {
                            _this.iSort.unshift(_this.iSort.pop());
                            _this.tSort.unshift(_this.tSort.pop());
                        }
                        _this.slider();
                    } else if (m > _this.iCenter) {
                        for (var k = 0; k < m - _this.iCenter; k++) {
                            _this.iSort.push(_this.iSort.shift());
                            _this.tSort.push(_this.tSort.shift());
                        }
                        _this.slider();
                    }
                };
                _this.iSort[i].onmouseover = function () {
                    var m = this.index - 1;
                    if (m == _this.iCenter) return;
                    var img = this.getElementsByTagName('img')[0];
                    _this.animate(img, {'opacity': 1});
                };
                _this.iSort[i].onmouseout = function () {
                    var m = this.index - 1;
                    if (m == _this.iCenter) return;
                    var img = this.getElementsByTagName('img')[0];
                    _this.animate(img, {'opacity': .35});
                }
            })(i);
        }
    },
    doPrev: function () {
        if (this.sliding) return;
        this.sliding = true;
        this.iSort.unshift(this.iSort.pop());
        this.tSort.unshift(this.tSort.pop());
        this.slider();
    },
    doNext: function () {
        if (this.sliding) return;
        this.sliding = true;
        this.iSort.push(this.iSort.shift());
        this.tSort.push(this.tSort.shift());
        this.slider();
    },
    slider: function () {
        var opt = this.opt, _this = this;
        for (i = 0; i < this.iSort.length; i++) this.oUl.appendChild(this.iSort[i]);
        for (i = 0; i < this.iSort.length; i++) {
            this.iSort[i].index = i;
            if (i < opt.disNum + 2) {
                this.css(this.iSort[i], {'display': 'block'});
                this.animate(_this.tSort[_this.iCenter + 1], {'top': 0});
                this.animate(this.iSort[i], this.property[i], function () {
                    _this.animate(_this.iSort[_this.iCenter + 1].getElementsByTagName('img')[0], {'opacity': 1}, function () {
                        _this.sliding = false;
                    });
                })
            } else {
                this.css(this.iSort[i], {
                    'width': 50,
                    'height': 50,
                    'display': 'none',
                    'top': opt.height / 2,
                    'left': this.outerWidth / 2
                })
            }
            ;
            if (i != this.iCenter + 1) {
                this.css(this.iSort[i].getElementsByTagName('img')[0], {'opacity': '.35'});
                this.css(this.tSort[i], 'top', 100);
            }
        }
    },
    $: function (id) {
        return typeof id == 'string' ? document.getElementById(id) : id
    },
    css: function (el, key, value) {
        if (arguments.length === 3) {
            this.setStyle(el, key, value);
        } else if (arguments.length === 2) {
            if (typeof key == 'string') {
                key = key.replace(/-\w/g, function (a) {
                    return a.charAt(1).toUpperCase()
                });
                return (el.style[key] == '') ? (el.currentStyle || document.defaultView.getComputedStyle(el, null))[key] : el.style[key];
            } else if (typeof key == 'object') {
                for (var name in key) {
                    this.setStyle(el, name, key[name]);
                }
            }
        }
        ;
    },
    setStyle: function (el, key, value) {
        var reg = /(width|height|top|left|right|bottom)/ig;
        key = key.replace(/-\w/g, function (a) {
            return a.charAt(1).toUpperCase()
        });
        if (reg.test(key)) {
            el.style[key] = value + 'px';
        } else if (key === 'opacity') {
            el.style.filter = "alpha(opacity=" + value * 100 + ")";
            el.style.opacity = value;
        } else {
            el.style[key] = value;
        }
    },
    cretaeProperty: function () {
        var opt = this.opt;
        var i = 0, j = 0, len = opt.disNum;
        this.property.push(this.p);
        for (; i < len; i++) {
            if (i <= this.iCenter) {
                this.property.push({
                    'width': Math.round(opt.width * Math.pow(opt.sacle, this.iCenter - i)),
                    'height': Math.round(opt.height * Math.pow(opt.sacle, this.iCenter - i)),
                    'left': i * this.space,
                    'top': Math.round((opt.height - Math.round(opt.height * Math.pow(opt.sacle, this.iCenter - i))) / 2),
                    'zIndex': i
                });
            } else {
                this.property.push({
                    'width': Math.round(opt.width * Math.pow(opt.sacle, i - this.iCenter)),
                    'height': Math.round(opt.height * Math.pow(opt.sacle, i - this.iCenter)),
                    'left': this.outerWidth - (this.iCenter - (i % this.iCenter ? i % this.iCenter : this.iCenter)) * this.space - Math.round(opt.width * Math.pow(opt.sacle, i - this.iCenter)),
                    'top': Math.round((opt.height - Math.round(opt.height * Math.pow(opt.sacle, i - this.iCenter))) / 2),
                    'zIndex': this.iCenter - (i % this.iCenter ? i % this.iCenter : this.iCenter)
                });
            }
        }
        ;
        this.property.push(this.p);
    },
    animate: function (el, opts, callback, aniFn) {
        var _easeInOutCubic = function (pos) {
            if ((pos /= 0.5) < 1) return 0.5 * Math.pow(pos, 3);
            return 0.5 * (Math.pow((pos - 2), 3) + 2);
        };
        opts = opts || {};
        var _this = this;
        var deStyle = {}, D = Date, d = new D, e, T = 500, o, F = function (x) {
            return (aniFn || _easeInOutCubic)(x)
        };
        for (var i in opts) {
            if (i == 'opacity') deStyle[i] = this.css(el, i);
            else deStyle[i] = parseInt(this.css(el, i));
        }
        ;
        return e = setInterval(function () {
            var z = Math.min(1, (new D - d) / T);
            for (var i in opts) {
                o = deStyle[i] - 0 + (opts[i] - deStyle[i]) * F(z);
                _this.css(el, i, o);
            }
            if (z === 1) {
                clearInterval(e);
                if (callback && typeof callback == 'function') callback();
            }
        }, 16);
    },
    extend: function (target, source) {
        for (var key in source) target[key] = source[key];
        return target;
    }
}

