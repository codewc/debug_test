var Gridsum;
(function (a) {
    function n(a) {
        return "string" == typeof a
    }

    var c = document, b = Math;
    a.b = {
        lower: function (a) {
            return a && n(a) ? a.toLowerCase() : a
        }, indexOf: function (a, c, d) {
            if (a) {
                if (a.indexOf) return a.indexOf(c, d);
                if (a.length) for (d = d || 0; d < a.length; d++) if (a[d] === c) return d
            }
            return -1
        }, qa: function (m, c) {
            var d = 1315423911, q, r;
            c || (m = a.b.lower(m));
            for (q = m.length - 1; 0 <= q; q--) r = m.charCodeAt(q), d ^= (d << 5) + r + (d >> 2);
            return d & 2147483647
        }, Ma: function () {
            return b.round((new Date).getTimezoneOffset() / -60) + ""
        }, Aa: function () {
            return (new Date).getTime() + 36E5 * Number(a.b.Ma())
        }, ra: function (a) {
            var m, d = [];
            for (m = 0; m < a; m++) d.push("abcdefghijklmnopqrstuvwxyz0123456789".charAt(b.round(35 * b.random())));
            return d.join("")
        }, A: function (m) {
            var c = (new Date).getTime() + "", d = "";
            m || (d = "" + b.abs(a.b.qa(location.href + document.referrer + navigator.userAgent)), d = d.substring(0, 2 < d.length ? 2 : d.length));
            return c.substring(2, c.length - 3) + (m ? a.b.ra(8) : a.b.ra(6)) + d
        }, P: function (m, b, d) {
            if (!m) return null;
            var q, r = a.b.Lb(c.cookie, "=", ";", !0);
            m = a.b.lower(m);
            for (q in r) if (r && r.hasOwnProperty && r.hasOwnProperty(q) && a.b.lower(q) === m) return d ? r[q] : a.b.decode(r[q]);
            return b || null
        }, W: function (m, b, d, q, r, n, A) {
            m && (m = a.b.lower(m), A || (b = a.b.encode(b)), m = m + "=" + b + ";", b = d ? "expires=" + a.b.hc(d).toUTCString() + ";" : "", c.cookie = m + b + (q ? "path=" + q + ";" : "path=/;") + (r ? "domain=" + r + ";" : "") + (n ? "secure=true;" : ""))
        }, lb: function (m, c, d) {
            a.b.W(m, "", -1E3, c, d)
        }, hc: function (a) {
            return new Date((new Date).getTime() + 1E3 * a)
        }, trim: function (a) {
            return a && n(a) ? a.replace(/(^\s+)|(\s+$)/ig, "") : a
        }, Lb: function (m, c, d, q) {
            var b = {};
            c = c || "=";
            m = m.split(d || "&");
            var n = q ? a.b.trim : function (a) {
                return a
            };
            for (q = 0; q < m.length; q++) d = m[q].indexOf(c), -1 < d ? b[n(m[q].substring(0, d))] = n(m[q].substring(d + 1)) : b[m[q]] = null;
            return b
        }, encode: function (a) {
            return a && n(a) ? (encodeURIComponent || escape)(a) : a
        }, decode: function (a) {
            if (a && n(a)) {
                a = a.replace(/\+/ig, "%20");
                try {
                    return (decodeURIComponent || unescape)(a)
                } catch (z) {
                }
            }
            return a
        }, Ce: function () {
            a.b.W("gs_tc", "1");
            var m = a.b.P("gs_tc");
            a.b.lb("gs_tc");
            return !!m
        }, mc: function (m) {
            var c = "cn hk tw au uk us \u516c\u53f8 \u4e2d\u56fd \u7f51\u7edc".split(" "),
                d = "com edu net org gov int cc me tel mobi asia biz info name tv".split(" "), q = m.split("."),
                b = q.length;
            return 3 <= b ? -1 < a.b.indexOf(c, q[b - 1]) && -1 < a.b.indexOf(d, q[b - 2]) ? q[b - 3] + "." + q[b - 2] + "." + q[b - 1] : q[b - 2] + "." + q[b - 1] : m
        }, Ne: function (b) {
            for (var m in b) a.b[m] = b[m]
        }, Jf: function (a) {
            var b = {}, d = location.search.substring(1);
            a && (a = a.split("?"), 2 == a.length && (d = a[1]));
            d = d.split("&");
            for (a = 0; a < d.length; a++) {
                var q = d[a].indexOf("=");
                -1 != q && (b[d[a].substring(0, q)] = decodeURIComponent(d[a].substring(q + 1)))
            }
            return b
        }, ic: function () {
            for (var a = "", b = 0; 8 > b; b++) a += (65536 * (1 + Math.random()) | 0).toString(16).substring(1);
            return a
        }, ge: function (a) {
            return 6E4 * a.getTimezoneOffset() + a.getTime()
        }
    }
})(Gridsum || (Gridsum = {}));
(function (a) {
    var n = window, c = document, b = c.documentElement, m = location, z = navigator.userAgent.toLowerCase(), d = Math,
        q, r, w, A, B, h, f, l = {
            nb: ["diag-wd.gridsumdissector.com/receivewddiag/gs.gif"], l: void 0, ed: function (a) {
                return a
            }, isArray: function (a) {
                return a && a.constructor == Array
            }, Cc: function (a, f) {
                return a && a.hasOwnProperty ? a.hasOwnProperty(f) : !1
            }, sa: function (a) {
                return "string" == typeof a
            }, R: function (a, f, v, h) {
                if (!f) return null;
                a = (a || m.pathname + m.search).replace(/\#.*/ig, "");
                for (var e = ["&", "?"], p = 0; 2 > p; p++) {
                    var y = l.find(a, e[p] + f + "=", "&", v);
                    if (null != y) return h ? A(y) : y
                }
                return null
            }, find: function (a, f, v, h, e) {
                a = l.dc(a, f, v, h, e);
                f = a.length;
                return 0 < f ? a[f - 1] : null
            }, dc: function (p, y, l, h, e) {
                if (!p || !f(p)) return [];
                var v = [], d, b, c = "";
                b = 0;
                y = y || "";
                h || (c = q(p), y = q(y), l = q(l));
                for (; -1 < b;) {
                    h = null;
                    -1 < (d = r(c, y, b)) && (h = d + y.length, l ? (b = r(c, l, h), b >= h ? (h = p.substring(h, b), b += l.length) : (h = p.substring(h), b = -1)) : (h = p.substring(h), b = -1));
                    if (!h) break;
                    v.push(e ? h : a.b.trim(h))
                }
                return v
            }, yb: function (a, f, l, h) {
                l = h ? l || m.pathname : q(l || m.pathname);
                f = q(f);
                B(a) || (a = [a]);
                for (h = 0; h < a.length; h++) {
                    var e = q(a[h]);
                    if ("contains" == f && -1 < r(l, e) || "startswith" == f && 0 == r(l, e) || "endswith" == f && -1 < r(l, e, l.length - e.length) || "exactmatch" == f && l == e || "regex" == f && e.test && e.test(l)) return !0
                }
                return !1
            }, ta: function (f) {
                for (; f && " " == f[0];) f = f.substr(1);
                var p, l = {url: f};
                (p = f.match(/((\w+:)?\/\/([^\/\#&?]*))?\/?([^?#]*)?(\?[^#]*)?(#.*)?/)) ? (f = p[2] || m.protocol, l.protocol = f.substring(0, f.length - 1), l.local = "file" == l.protocol, l.host = p[3] || m.host, l.path = "/" + (p[4] || ""), l.fullPath = l.path, l.query = (p[5] || "").substring(1), l.anchor = (p[6] || "").substring(1), l.query && (l.fullPath += "?" + l.query, l.g = a.b.Lb(l.query.replace(/\?/g, "&")))) : (l.local = !0, l.protocol = "file", l.fullPath = l.path = "/" + f.replace(/\\/g, "/"));
                return l
            }, D: function (a, f, b, d, e) {
                function p(e) {
                    if (!e) return "";
                    var a = [], f;
                    for (f in e) h(e, f) && (e[f] || 0 === e[f]) && a.push(f + ":" + w(e[f]));
                    return a.join(";")
                }

                var y = [];
                e = e ? l.ed : w;
                var v, q = "gsurl gsorurl gsref gsmcurl lk url gssresurl gssref gsourl".split(" ");
                f = f || "=";
                b = b || "&";
                for (v in a) {
                    var c = !1, m;
                    for (m in q) if (q[m] == v) {
                        c = !0;
                        break
                    }
                    !c && h(a, v) && (d || a[v] || 0 === a[v]) && y.push(v + f + ("pcp" == v || "ecp" == v ? p(a[v]) : e(a[v])))
                }
                for (v = 0; v < q.length; v++) h(a, q[v]) && (d || a[q[v]] || 0 === a[q[v]]) && y.push(q[v] + f + e(a[q[v]]));
                return y.join(b)
            }, T: function (a) {
                return f(a) ? c.getElementById(a) : a
            }, Pb: function (a, f, h, b, e) {
                b = b || 30;
                var p = setInterval(function () {
                    var h;
                    if (a.split) {
                        var y = a.split(".", 3), v = y.length, d = n;
                        if (1 < v) {
                            for (h = 0; h < v; h++) if (!h || "window" != y[h]) if (d = d[y[h]], !d) break;
                            h = d
                        }
                    }
                    h || (h = l.T(a)) ? (clearInterval(p), f(h)) : 0 < b ? --b : (clearInterval(p), e && e(h))
                }, h || 1E3)
            }, o: function (a) {
                var f, h, p;
                f = c.body;
                if (null === a.parentNode || "none" == a.style.display) return null;
                if (a.getBoundingClientRect) return h = a.getBoundingClientRect(), a = d.max(b.scrollTop, f.scrollTop), f = d.max(b.scrollLeft, f.scrollLeft), f = "BackCompat" == c.compatMode && l.Pa() ? {
                    x: h.left,
                    y: h.top
                } : {x: h.left + f, y: h.top + a};
                if (c.getBoxObjectFor) h = c.getBoxObjectFor(a), p = [h.x - (a.style.borderLeftWidth ? parseInt(a.style.borderLeftWidth, 10) : 0), h.y - (a.style.borderTopWidth ? parseInt(a.style.borderTopWidth, 10) : 0)]; else {
                    p = [a.offsetLeft, a.offsetTop];
                    h = a.offsetParent;
                    if (h != a) for (; h;) p[0] += h.offsetLeft, p[1] += h.offsetTop, h = h.offsetParent;
                    if (-1 != r(z, "opera") || -1 != r(z, "safari") && "absolute" == a.style.position) p[0] -= f.offsetLeft, p[1] -= f.offsetTop
                }
                for (h = a.parentNode ? a.parentNode : null; h && "BODY" != h.tagName && "HTML" != h.tagName;) p[0] -= h.scrollLeft, p[1] -= h.scrollTop, h = h.parentNode ? h.parentNode : null;
                return f = {x: p[0], y: p[1]}
            }, pb: function () {
                return b && b.scrollWidth || c.body && c.body.scrollWidth || 0
            }, lc: function (a) {
                var f = c.body || {scrollLeft: 0, scrollTop: 0};
                return {
                    x: a.pageX || a.clientX + (b.scrollLeft || f.scrollLeft) - (b.clientLeft || 0),
                    y: a.pageY || a.clientY + (b.scrollTop || f.scrollTop) - (b.clientTop || 0)
                }
            }, observe: function (a, f, h) {
                function p(e) {
                    e.target || (e.target = e.srcElement || a);
                    if (!e.pageX) {
                        var f = l.lc(e);
                        e.pageX = f.x;
                        e.pageY = f.y
                    }
                    e.root = a;
                    h.call(a, e)
                }

                "beforeunload" == f && l.Bc() && (f = "pagehide");
                a = l.T(a);
                if (!a) return null;
                a.addEventListener ? a.addEventListener(f, p, !1) : a.attachEvent("on" + f, p);
                return a
            }, Ha: function (a, f) {
                function h(a) {
                    e = a.pageX;
                    b = a.pageY
                }

                function p(h) {
                    h.target || (h.target = h.srcElement || a);
                    try {
                        if (h.changedTouches[0].pageX != e || h.changedTouches[0].pageY != b) {
                            b = e = null;
                            return
                        }
                    } catch (J) {
                        l.f("", "M_utility_observeTouch", J);
                        b = e = null;
                        return
                    }
                    l.l = {la: e, ma: b};
                    b = e = null;
                    h.root = a;
                    f.call(a, h)
                }

                var e, b;
                a = l.T(a);
                if (!a) return null;
                a.addEventListener ? (a.addEventListener("touchstart", h, !1), a.addEventListener("touchend", p, !1)) : (a.attachEvent("ontouchstart", h), a.attachEvent("ontouchend", p));
                return a
            }, ha: function (f) {
                if (f = l.T(f)) {
                    if (f.innerText) return a.b.trim(f.innerText).replace(/\n+/ig, " ");
                    if (f.innerHTML) return a.b.trim(f.innerHTML.replace(/<[^>]+>/ig, "")).replace(/\n+/ig, "")
                }
                return null
            }, ia: function (a, f) {
                a = l.T(a);
                var h = "";
                if (a && a.innerHTML) for (var b = a.innerHTML, e = b.indexOf(f + '="'); -1 != e;) var e = e + (f.length + 2), p = b.indexOf('"', e), h = h + b.substr(e, p - e), b = b.substr(p), e = b.indexOf(f + '="');
                return h
            }, s: function (a, l, b, d, e) {
                var p;
                b = q(b);
                a = a && a.parentNode;
                var y = void 0 === l.target || f(l.target) ? l : l.target;
                do {
                    l = !0;
                    if (!b || q(y.tagName) == b) for (p in l = !1, d) if (h(d, p) && 0 > r(q(y[p] || y.getAttribute(p)), q(d[p]))) {
                        l = !0;
                        break
                    }
                    if (l) y = y.parentNode; else return y;
                    if (0 == e) break;
                    e--
                } while (y && y != a && y.getAttribute);
                return null
            }, f: function (f, h, b) {
                try {
                    b = b || {};
                    for (var p = 0; p < l.nb.length; p++) {
                        var e = ("https:" == m.protocol ? "https://" : "http://") + l.nb[p] + "?gscmd=err&gsrd=" + d.round(2147483647 * d.random()) + "&gsver=" + a.j.version + "&gserrc=" + h + "&gssrvid=" + f + "&gserrobj=" + l.D(b, "~", "'");
                        (new Image(1, 1)).src = e
                    }
                } catch (G) {
                }
            }, fc: function (f, h) {
                var b, p, e, d = h.fb, q = h.Ab, c = h.Jb, y = h.Bb, m = h.jb, r = h.sb, n = h.gb, z = h.Tb, w = h.I;
                p = l.ta(f);
                !p.local && (p = new a.nd(p.host, [], [d, q, c, y, m, r, n, z]), b = {
                    xa: w.xa,
                    group: w.group,
                    source: w.source,
                    Ga: w.Ga,
                    Ea: w.Ea,
                    content: w.content,
                    channel: w.channel,
                    ua: w.ua
                }, p = p.match(f.replace(/#/g, "?"))) && (e = p.g, 0 !== p.Ue && (b.xa = w.xa || (d != h.Vb ? A(e[d]) : null), b.group = w.group || (r != h.oc ? A(e[r]) : null), b.source = w.source || (c != h.Xc ? A(e[c]) : null), b.Ga = w.Ga || (y != h.Lc ? A(e[y]) : null), b.Ea = w.Ea || (q != h.Fc ? A(e[q]) : null), b.content = w.content || (m != h.Zb ? A(e[m]) : null), b.channel = w.channel || (n != h.Wb ? A(e[n]) : null), b.ua = w.ua || (z != h.Ub ? A(e[z]) : null)));
                return b
            }, Pa: function () {
                return "\v" == "v"
            }, Bc: function () {
                var a = navigator.userAgent;
                return 0 <= a.indexOf("Android") || 0 <= a.indexOf("iPhone") || 0 <= a.indexOf("iPad")
            }, Kf: function () {
                var a = navigator.userAgent;
                return 0 <= a.indexOf("iPhone") || 0 <= a.indexOf("iPad")
            }, H: function (f, h) {
                return q(w(f + "_" + a.b.qa(h.c + "_" + h.domain)))
            }, Yd: function () {
                function a(a, e) {
                    var f = e.match(a);
                    return f ? f[1] : null
                }

                var f, h, l = navigator.plugins, e, b, d = null, c = null;
                if (l && 0 < (e = l.length)) for (h = 0; h < e; h++) f = q(l[h].description), b = q(l[h].name), !d && f && -1 < r(f, "shockwave flash") && (d = a(/shockwave flash (\d+\.\d+)/i, f)), !c && b && f && -1 < r(b, "silverlight") && (c = a(/(\d+\.\d+)/i, f));
                return {Sd: d, lf: c}
            }, Ka: function () {
                try {
                    var f = n.sessionStorage;
                    if (f) {
                        var h = f.getItem("_gsdvid_");
                        if (h && 32 === h.length) return h;
                        var l = a.b.R(m.href, "_gsdvid_");
                        if (l && 32 === l.length) return f && f.setItem("_gsdvid_", l), l
                    }
                } catch (E) {
                }
                return null
            }, va: function (f, h, l) {
                try {
                    var b = new a.$a(f);
                    if (!h) return b;
                    var e = h.split("&"), d = b.g, p;
                    for (p in e) for (var q in l) if (-1 < e[p].indexOf(l[q])) {
                        var c = e[p].split("=");
                        for (f = 0; f < d.length; f++) 0 === d[f].indexOf(c[0]) && b.Dd(f, e[p]);
                        b.cb(c[0], c[1])
                    }
                    return b
                } catch (R) {
                    return b
                }
            }, vd: function (f, h, l) {
                try {
                    var b = new a.$a(f), e = h.split("?");
                    1 < e.length && (b = a.b.va(f, e[1], ["utm_"]));
                    l && b.bb("refurl", l);
                    return b.toString()
                } catch (G) {
                    return f
                }
            }, Re: function (f) {
                location.href = a.b.vd(f, m.href, c.referrer)
            }, qb: function (a) {
                return Number(a.split("-")[1])
            }, Xa: function (a, f) {
                f--;
                try {
                    return decodeURIComponent(a.substring(0, f))
                } catch (v) {
                    return l.Xa(a, f)
                }
            }
        };
    q = a.b.lower;
    r = a.b.indexOf;
    w = a.b.encode;
    A = a.b.decode;
    B = l.isArray;
    h = l.Cc;
    f = l.sa;
    a.b.Ne(l)
})(Gridsum || (Gridsum = {}));
(function (a) {
    var n = function () {
        function c(a) {
            this.a = a
        }

        c.prototype.get = function (b, c) {
            if ("_gscu" === b) {
                var m = a.b.R(location.href, "_gscu_");
                null !== m && this.set("_gscu", m, 63072E3)
            } else "_gscs" === b && (m = a.b.R(location.href, "_gscs_"), null !== m && (m = a.b.decode(m), this.set("_gscs", m, 1800)));
            return a.b.P(a.b.H(b, this.a), c, !0)
        };
        c.prototype.set = function (b, c, n, d, q, r) {
            q = q || this.a.domain;
            d = d || this.a.path;
            r = r || this.a.gf;
            a.b.W(a.b.H(b, this.a), c, n, d, q, r, !0)
        };
        c.prototype.remove = function (a) {
            this.set(a, "0", -1E3)
        };
        return c
    }();
    a.Za = n
})(Gridsum || (Gridsum = {}));
(function (a) {
    var n = window, c = function () {
        function d(d) {
            void 0 == n.gstempobj && (n.gstempobj = "");
            this.a = d;
            this.Wa = [new a.Za(d), new b(d), new m(d), new z(d)]
        }

        d.prototype.get = function (a, b) {
            if (!a) return null;
            var d;
            try {
                d = sessionStorage.getItem("_gsdvid_")
            } catch (f) {
            }
            var c, q, h;
            for (q = 0; 4 > q; q++) if (c = this.Wa[q].get(a)) {
                for (h = 0; 4 > h; h++) q != h && this.Wa[h].set(a, c, 63072E3);
                return "_gscu" === a ? d || c : c
            }
            return "_gscu" === a ? d || b || null : b || null
        };
        d.prototype.set = function (a, b, d, c, m, h) {
            if (a) {
                var f;
                for (f = 0; 4 > f; f++) this.Wa[f].set(a, b, d, c, m, h)
            }
        };
        d.prototype.remove = function (a) {
            this.Wa[3].remove(a)
        };
        return d
    }();
    a.ld = c;
    var b = function () {
        function b(a) {
            this.a = a;
            this.$ = ["_gscu"]
        }

        b.prototype.get = function (b) {
            try {
                if (0 <= a.b.indexOf(this.$, b)) {
                    var d = n.localStorage;
                    if (d) return d.getItem(a.b.H(b, this.a))
                }
            } catch (w) {
            }
            return null
        };
        b.prototype.set = function (b, d) {
            try {
                if (0 <= a.b.indexOf(this.$, b)) {
                    var c = n.localStorage;
                    c && c.setItem(a.b.H(b, this.a), d)
                }
            } catch (A) {
            }
        };
        return b
    }(), m = function () {
        function b(a) {
            this.a = a;
            this.$ = ["_gscu"]
        }

        b.prototype.get = function (b) {
            try {
                if (0 <= a.b.indexOf(this.$, b)) {
                    var d = n.sessionStorage;
                    if (d) return d.getItem(a.b.H(b, this.a))
                }
            } catch (w) {
            }
            return null
        };
        b.prototype.set = function (b, d) {
            try {
                if (0 <= a.b.indexOf(this.$, b)) {
                    var c = n.sessionStorage;
                    c && c.setItem(a.b.H(b, this.a), d)
                }
            } catch (A) {
            }
        };
        return b
    }(), z = function () {
        function b(a) {
            this.a = a;
            this.$ = ["_gscu"]
        }

        b.prototype.get = function (b) {
            try {
                if (0 <= a.b.indexOf(this.$, b)) return this.Zd(a.b.H(b, this.a), n.gstempobj)
            } catch (r) {
            }
            return null
        };
        b.prototype.set = function (b, d) {
            try {
                0 <= a.b.indexOf(this.$, b) && (n.gstempobj = this.replace(n.gstempobj, a.b.H(b, this.a), d))
            } catch (w) {
            }
        };
        b.prototype.replace = function (a, b, d) {
            if (-1 < a.indexOf("&" + b + "=") || 0 === a.indexOf(b + "=")) {
                var c = a.indexOf("&" + b + "=");
                -1 === c && (c = a.indexOf(b + "="));
                var m = a.indexOf("&", c + 1);
                return -1 !== m ? a.substr(0, c) + a.substr(m + (c ? 0 : 1)) + "&" + b + "=" + d : a.substr(0, c) + "&" + b + "=" + d
            }
            return a + "&" + b + "=" + d
        };
        b.prototype.Zd = function (a, b) {
            if ("string" !== typeof b) return null;
            var d = a + "=", c = b.split(/[;&]/), m, h;
            for (m = 0; m < c.length; m++) {
                for (h = c[m]; " " === h.charAt(0);) h = h.substring(1, h.length);
                if (0 === h.indexOf(d)) return h.substring(d.length, h.length)
            }
            return null
        };
        return b
    }()
})(Gridsum || (Gridsum = {}));
(function (a) {
    var n = window, c = function () {
        function b(a, b) {
            this.a = a;
            try {
                this.m = b || n.localStorage
            } catch (d) {
            }
        }

        b.prototype.rb = function (b, c, d) {
            d = d || this.a.Va[0];
            return d + "?" + a.b.D(b, "=", "&", !1, c)
        };
        b.prototype.V = function (b, c, d) {
            if (!document.body || "on" !== document.body.getAttribute("gswp")) {
                b.rd = a.b.ra(5);
                var m = this.a.c, n = new Image(1, 1), w = {};
                a.j.execHook("sender.send", b, d, w);
                if (!w.cancel) {
                    var z = this.rb(b, c, d).substring(0, 2E3);
                    n.onerror = function () {
                        setTimeout(function () {
                            var c = new Image(1, 1);
                            c.onload = function () {
                                a.b.f(m, "RetrySuccess", {cmd: b.gscmd, url: d})
                            };
                            c.onerror = function () {
                                a.b.f(m, "SendingFailed", {cmd: b.gscmd, url: d})
                            };
                            c.src = z
                        }, 2E3)
                    };
                    n.src = z
                }
            }
        };
        b.prototype.Gd = function (b) {
            b.rd = a.b.ra(5);
            return 2E3 >= this.rb(b, void 0, void 0).length
        };
        b.prototype.send = function (a, b, d) {
            if (a) for (var c = [this.a.c].concat(this.a.Sb), m = 0; m < c.length; m++) if (a.gssrvid = c[m], d) this.V(a, b, d); else for (var n = this.a.Va, z = 0; z < n.length; z++) this.V(a, b, n[z])
        };
        b.prototype.appendData = function (b, c, d) {
            try {
                var m = this.Cb();
                100 > m.length && (m.push({
                    obj: b,
                    noEncode: c,
                    destUrl: d
                }), this.m.setItem(a.b.H("gsfailed", this.a), JSON.stringify(m)))
            } catch (r) {
            }
        };
        b.prototype.Ve = function () {
            try {
                var b = this.Cb(), c = b.splice(0, 1)[0];
                this.m.setItem(a.b.H("gsfailed", this.a), JSON.stringify(b));
                return c
            } catch (d) {
            }
            return null
        };
        b.prototype.cf = function (b, c) {
            try {
                var d = this.Cb(), m;
                for (m = 0; m < d.length; m++) d[m].obj.dedupid == b && d[m].destUrl === c && (d.splice(m, 1), m--);
                this.m.setItem(a.b.H("gsfailed", this.a), JSON.stringify(d))
            } catch (r) {
            }
        };
        b.prototype.Cb = function () {
            try {
                var b = a.b.H("gsfailed", this.a), c = n.localStorage.getItem(b);
                this.m.removeItem(b);
                if (c) return JSON.parse(c)
            } catch (d) {
            }
            return []
        };
        return b
    }();
    a.Qb = c
})(Gridsum || (Gridsum = {}));
var __extends = this && this.__extends || function () {
    var a = Object.setPrototypeOf || {__proto__: []} instanceof Array && function (a, c) {
        a.__proto__ = c
    } || function (a, c) {
        for (var b in c) c.hasOwnProperty(b) && (a[b] = c[b])
    };
    return function (n, c) {
        function b() {
            this.constructor = n
        }

        a(n, c);
        n.prototype = null === c ? Object.create(c) : (b.prototype = c.prototype, new b)
    }
}();
(function (a) {
    var n = String.fromCharCode, c = document, b = function () {
        return function (a) {
            this.Jc = a.matchPattern;
            this.Kc = a.matchType
        }
    }(), m = function () {
        return function (a) {
            this.Ob = a.urlMatchRule;
            this.target = a.target
        }
    }(), z = function () {
        return function (a) {
            this.ka = a.userBehaviorCondition;
            this.na = a.actions
        }
    }(), d = function () {
        return function (a) {
            this.qd = a.actionType;
            this.ab = a.actionOption
        }
    }();
    a.xf = d;
    var q = function () {
        return function (a) {
            this.Od = a.eventCategory;
            this.Qd = a.eventName;
            this.Pd = a.eventDescription;
            this.$b = a.customParam
        }
    }();
    a.Bf = function () {
        return function (a) {
            this.key = a.key;
            this.value = a.value
        }
    }();
    var r = {
        nc: function (b, f) {
            var l = "";
            if (b) {
                var h = b.childNodes, c;
                for (c in h) if ("#text" === h[c].nodeName) {
                    var l = l + (h[c].textContent || h[c].nodeValue).replace(/(^\s+)|(\s+$)/ig, "") + "\n",
                        d = encodeURIComponent(l);
                    if (d.length > f) {
                        l = d.substring(0, f);
                        try {
                            return decodeURIComponent(l)
                        } catch (E) {
                            return a.b.Xa(l, f)
                        }
                    }
                }
            }
            return l
        }, Zc: function (a) {
            var f = "";
            try {
                a.M && (f += a.M), a.ga && (f += a.ga), a.Y && (f += a.Y), a.X && (f += a.X), a.N && (f += a.N), a.Z && (f += a.Z), a.fa && (f += a.fa)
            } catch (l) {
            }
            return f
        }, Ac: function (a, f) {
            try {
                return a.Y && a.Y != f.Y || a.X && a.X != f.X || a.Z && a.Z != f.Z || a.ga && a.ga != f.ga || a.N && a.N != f.N || a.fa && a.fa != f.fa ? !1 : !0
            } catch (l) {
                return !1
            }
        }, ec: function (b, f, l, d, m) {
            b = b || c;
            f = b.getElementsByTagName(f);
            for (var h = [], p = 0; p < f.length; p++) (b == c || f[p].parentElement == b) && a.b.trim(f[p].getAttribute("id") || "") == l && (l || -1 < a.b.trim(f[p].getAttribute("class") || "").indexOf(d)) && (m ? f[p].parentElement.children[Number(m) - 1] == f[p] : 1) && h.push(f[p]);
            return h
        }, Oe: function (a) {
            return r.Nc(a)[0]
        }, Nc: function (a) {
            try {
                return c.querySelectorAll(a)
            } catch (F) {
            }
            a = a.split(">");
            for (var f = [], b, h = 0; h < a.length; h++) {
                var d = a[h].match(/(\w+)/)[0];
                b = a[h].substr(d.length) && a[h].substr(d.length).replace(/:nth-child\(\d*\)/g, "");
                var m = "", n = "";
                "#" == b[0] ? 0 > b.indexOf(".") ? m = b.substr(1) : (m = b.split(".")[0].substr(1), n = b.substr(m.length + 2)) : "." == b[0] && (n = b.substr(1));
                var n = n && n.replace(/\./g, " "),
                    e = a[h].match(/:nth-child\((\d*)\)/) && a[h].match(/:nth-child\((\d*)\)/)[1];
                if (0 == f.length) f = r.ec(c, d, m, n, e); else {
                    b = [];
                    for (var q = 0; q < f.length; q++) b = b.concat(r.ec(f[q], d, m, n, e));
                    f = b
                }
            }
            return f
        }, Fe: function (a, f) {
            return a && a.tagName && a.tagName.toLowerCase() === f.toLowerCase()
        }, Ud: function (a) {
            var f = a.className || "";
            f && "object" == typeof a.className && (f = a.className.Gf || a.getAttribute("class") || "");
            return f
        }, wd: function (a) {
            for (var f = 0; f < a.length; f++) if ("" == a[f] || "undefined" == typeof a[f]) a.splice(f, 1), --f;
            return a
        }, df: function (a) {
            return a && a.replace(/:nth-child\((\d*)\)/g, "{$1}")
        }
    };
    a.md = function () {
        return function (a) {
            this.We = a.pickerPath;
            this.Ld = a.customText;
            this.element = r.Oe(this.We);
            this.Xe = this.Ld || r.nc(this.element, 270)
        }
    }();
    var w = function (a) {
        function f(f) {
            var b = a.call(this, f) || this;
            b.element = f;
            b.zd();
            return b
        }

        __extends(f, a);
        f.prototype.zd = function () {
            try {
                var a = this.element;
                this.M = this.ae();
                this.ga = a.tagName.toLocaleLowerCase();
                a.getAttribute("id") && (this.Y = a.getAttribute("id"));
                a.getAttribute("class") && (this.X = a.getAttribute("class"));
                "INPUT" === a.tagName ? this.N = a.getAttribute("value") : "IMG" === a.tagName ? this.N = a.src : (this.N = r.nc(a, 270).replace(/(^\s+)|(\s+$)/ig, ""), this.fa = a.href);
                this.Z = Number(this.pa[this.pa.length - 1].nth_child)
            } catch (p) {
            }
        };
        f.prototype.getData = function () {
            var a = {};
            try {
                this.M && (a.tgpth = this.M), this.ga && (a.tgtag = this.ga), this.Y && (a.tgid = this.Y), this.X && (a.tgcls = this.X), this.N && (a.tgtxt = this.N), this.Z && (a.tgidx = this.Z), this.fa && (a.tghre = this.fa)
            } catch (p) {
            }
            return a
        };
        f.prototype.toString = function () {
            return r.Zc(this)
        };
        return f
    }(function () {
        function b(a) {
            this.pa = [];
            this.target = a;
            this.B()
        }

        b.prototype.B = function () {
            try {
                var a = this.target;
                for (this.Kb = [this.target]; a.parentNode && !r.Fe(a.parentNode, "body");) this.Kb.unshift(a.parentNode), a = a.parentNode;
                for (a = 0; a < this.Kb.length; a++) this.pa.push(this.ce(this.Kb[a]))
            } catch (l) {
            }
        };
        b.prototype.previousElementSibling = function (a) {
            if (a.previousElementSibling) return a.previousElementSibling;
            do a = a.previousSibling; while (a && 1 !== a.nodeType);
            return a
        };
        b.prototype.ce = function (a) {
            for (var f = {
                classes: r.Ud(a).split(" "),
                tag_name: a.tagName.toLowerCase()
            }, b = a.attributes, c = 0; c < b.length; c++) f["attr__" +
            b[c].name] = b[c].value;
            for (var c = b = 1, d = a; d = this.previousElementSibling(d);) b++, d.tagName === a.tagName && c++;
            f.nth_child = b;
            f.nth_of_type = c;
            return f
        };
        b.prototype.D = function (b, l) {
            var f, c, d;
            f = b.tag_name || "";
            if (l) return f;
            c = b.attr__id ? "#" + a.b.trim(b.attr__id) : "";
            d = b.classes[0] ? "." + r.wd(b.classes).join(".") : "";
            return f + c + d + (b.nth_child ? ":nth-child(" + b.nth_child + ")" : "")
        };
        b.prototype.ae = function () {
            try {
                for (var a = [], b = 0; b < this.pa.length; b++) a.push(this.D(this.pa[b], b === this.pa.length - 1));
                return r.df(a.join(">"))
            } catch (p) {
                return ""
            }
        };
        return b
    }());
    a.kd = w;
    var A = function () {
        function a(a) {
            this.Z = a.targetIndex;
            this.M = a.targetPath.replace(/\{(\d*)}/g, ":nth-child($1)");
            this.ga = a.targetTagName;
            this.Y = a.targetId;
            this.X = a.targetClass;
            this.N = a.targetText;
            this.fa = a.targetHref
        }

        a.prototype.Wd = function () {
            var a = this.M.split(">");
            this.Y || (a[a.length - 1] = a[a.length - 1].replace(/#\w+/ig, ""), this.M = a.join(">"));
            this.X || (a[a.length - 1] = a[a.length - 1].replace(/\.\w+/ig, ""), this.M = a.join(">"));
            this.Z || (this.M = this.M.replace(/{\d+}$/ig, ""));
            for (var a = r.Nc(this.M), b = [], c = 0; c < a.length; c++) {
                var d = new w(a[c]);
                r.Ac(this, d) && b.push(a[c])
            }
            return b
        };
        a.prototype.toString = function () {
            return r.Zc(this)
        };
        return a
    }();
    a.Ff = A;
    var B = function () {
        function h(a) {
            this.u = a.configurations;
            this.ff()
        }

        h.prototype.ff = function () {
            try {
                for (var a = 0; a < this.u.length; a++) {
                    this.u[a] = new z(this.u[a]);
                    this.u[a].ka = new m(this.u[a].ka);
                    this.u[a].ka.Ob = new b(this.u[a].ka.Ob);
                    this.u[a].ka.target = new A(this.u[a].ka.target);
                    for (var c = 0; c < this.u[a].na.length; c++) this.u[a].na[c] = new d(this.u[a].na[c]), this.u[a].na[c].ab = new q(this.u[a].na[c].ab)
                }
            } catch (p) {
            }
        };
        h.prototype.Gb = function (b) {
            try {
                var f = new a.$a(b), c = f.F.split("/"), d = c[c.length - 1];
                d && (0 > d.indexOf(".") || 3 == c.length) && (f.F += "/");
                return f.toString()
            } catch (v) {
                return b
            }
        };
        h.prototype.Xd = function (b) {
            try {
                for (var f = [], c = 0; c < this.u.length; c++) try {
                    var d = this.u[c], h = d.ka, m = h.target, e = this.jc(b, m.Wd(), 99);
                    if (e && r.Ac(m, e)) {
                        var n = h.Ob;
                        if (!n || n && a.b.yb(4 == n.Kc ? new RegExp(n.Jc) : n.Jc, this.La(n.Kc), this.Gb(location.href), !0)) f = f.concat(d.na)
                    }
                } catch (F) {
                }
                return f
            } catch (F) {
            }
            return []
        };
        h.prototype.jc = function (a, b, d) {
            try {
                if (a.element == c.body) return null;
                if (!d--) return a;
                var f = a.element.parentNode;
                if (f) {
                    for (var h = new w(f), l = 0; l < b.length; l++) {
                        if (b[l] == a.element) return a;
                        if (b[l] == f) return h
                    }
                    return this.jc(h, b, d)
                }
            } catch (e) {
            }
            return a
        };
        h.prototype.La = function (a) {
            return 0 === a ? "exactmatch" : 1 === a ? "startswith" : 2 === a ? "endswith" : 3 === a ? "contains" : 4 === a ? "regex" : ""
        };
        return h
    }();
    a.gd = B;
    B = function () {
        function a(a, b) {
            this.w = [];
            this.qf = a;
            this.Fb = b % 256;
            this.B()
        }

        a.prototype.B = function () {
            var a = "a", b = this.v("A", 0), c;
            for (c = 0; 62 > c; ++c) 26 == c && (b = this.v(a, 0)), 52 == c && (a = "0", b = this.v(a, 0)), this.w[b] = c, b++;
            this.w[this.v("+", 0)] = 62;
            this.w[this.v("/", 0)] = 63;
            this.w[this.v("-", 0)] = 62;
            this.w[this.v("_", 0)] = 63
        };
        a.prototype.Ye = function (a) {
            var b = a.length;
            if (!(0 < b % 4)) return "=" === a[b - 2] ? 2 : "=" === a[b - 1] ? 1 : 0
        };
        a.prototype.xd = function (a) {
            var b, f, c, d, h;
            b = a.length;
            d = this.Ye(a);
            h = Array(3 * b / 4 - d);
            f = 0 < d ? b - 4 : b;
            var e = 0;
            for (b = 0; b < f; b += 4) c = this.w[this.v(a, b)] << 18 | this.w[this.v(a, b + 1)] << 12 | this.w[this.v(a, b + 2)] << 6 | this.w[this.v(a, b + 3)], h[e++] = c >> 16 & 255, h[e++] = c >> 8 & 255, h[e++] = c & 255;
            2 === d ? (c = this.w[this.v(a, b)] << 2 | this.w[this.v(a, b + 1)] >> 4, h[e++] = c & 255) : 1 === d && (c = this.w[this.v(a, b)] << 10 | this.w[this.v(a, b + 1)] << 4 | this.w[this.v(a, b + 2)] >> 2, h[e++] = c >> 8 & 255, h[e++] = c & 255);
            return h
        };
        a.prototype.Ad = function (a) {
            for (var b = 0, c = "", d; b < a.length;) d = a[b], 0 === d >>> 7 ? (c += n(a[b]), b += 1) : 252 === (d & 252) ? (d = (a[b] & 3) << 30, d |= (a[b + 1] & 63) << 24, d |= (a[b + 2] & 63) << 18, d |= (a[b + 3] & 63) << 12, d |= (a[b + 4] & 63) << 6, d |= a[b + 5] & 63, c += n(d), b += 6) : 248 === (d & 248) ? (d = (a[b] & 7) << 24, d |= (a[b +
            1] & 63) << 18, d |= (a[b + 2] & 63) << 12, d |= (a[b + 3] & 63) << 6, d |= a[b + 4] & 63, c += n(d), b += 5) : 240 === (d & 240) ? (d = (a[b] & 15) << 18, d |= (a[b + 1] & 63) << 12, d |= (a[b + 2] & 63) << 6, d |= a[b + 3] & 63, c += n(d), b += 4) : 224 === (d & 224) ? (d = (a[b] & 31) << 12, d |= (a[b + 1] & 63) << 6, d |= a[b + 2] & 63, c += n(d), b += 3) : 192 === (d & 192) ? (d = (a[b] & 63) << 6, d |= a[b + 1] & 63, c += n(d), b += 2) : (c += n(a[b]), b += 1);
            return c
        };
        a.prototype.v = function (a, b) {
            return a.charCodeAt(b)
        };
        a.prototype.Md = function () {
            var a, b = this.xd(this.qf);
            for (a = 0; a < b.length; a++) b[a] = b[a] < this.Fb ? b[a] + 256 - this.Fb : b[a] - this.Fb;
            return this.Ad(b)
        };
        return a
    }();
    a.hd = B
})(Gridsum || (Gridsum = {}));
(function (a) {
    a.Df = function () {
        return function () {
        }
    }();
    var n = function () {
        function c(b) {
            this.a = b;
            this.tf = 0;
            this.Id = new a.Za(b)
        }

        c.prototype.Vd = function (a) {
            try {
                var b = new XMLHttpRequest;
                b.open("GET", c.wf + "/cmlist?gssrvid=" + this.a.c, !0);
                b.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
                b.withCredentials = !0;
                b.onreadystatechange = function () {
                    if (4 == b.readyState) if (200 == b.status) {
                        var c = JSON.parse(b.responseText);
                        c.success && a(c.data)
                    } else a(null)
                };
                b.send()
            } catch (z) {
            }
        };
        c.prototype.kb = function (a, c) {
            var b = new Image(1, 1);
            b.onload = function () {
                c()
            };
            b.onerror = function () {
            };
            b.src = a
        };
        c.prototype.cc = function () {
            var a = this.Id;
            if (null == a.get("UDMP_CM_SIGN")) {
                var c = this;
                this.Vd(function (b) {
                    if (null != b && null != b.list) if (null == b.gridsumId) setTimeout(function () {
                        3 > c.tf++ && c.cc()
                    }, 2E3); else {
                        var d = b.list;
                        a.set("UDMP_CM_SIGN", "1", 7200);
                        for (var m, n = 0; n < d.length; n++) m = d[n], function (a) {
                            "1" == a.origin && c.kb(a.partnerCmUrl.replace("{gid}", b.gridsumId).replace("{timestamp}", (new Date).getTime() + ""), function () {
                                c.kb(a.udmpCmUrl + "&gssrvid=" + c.a.c, function () {
                                })
                            });
                            "2" == a.origin && c.kb(a.partnerCmUrl.replace("{gid}", b.gridsumId).replace("{timestamp}", (new Date).getTime() + ""), function () {
                            })
                        }(m)
                    }
                })
            }
        };
        c.wf = "http" + ("https:" == location.protocol ? "s" : "") + "://cm-udmp.gridsumdissector.com";
        return c
    }();
    a.jd = n
})(Gridsum || (Gridsum = {}));
__extends = this && this.__extends || function () {
    var a = Object.setPrototypeOf || {__proto__: []} instanceof Array && function (a, c) {
        a.__proto__ = c
    } || function (a, c) {
        for (var b in c) c.hasOwnProperty(b) && (a[b] = c[b])
    };
    return function (n, c) {
        function b() {
            this.constructor = n
        }

        a(n, c);
        n.prototype = null === c ? Object.create(c) : (b.prototype = c.prototype, new b)
    }
}();
(function (a) {
    function n(b) {
        if ("U" == b[0]) S[b[1]](b[2], b[3], b[4], b[5], b[6], b[7], b[8]); else if ("W" == b[0]) a.j[b[1]](b[2], b[3], b[4]); else if ("T" == b[0]) {
            var k = a.j.getTracker(b[1]);
            k[b[2]](b[3], b[4], b[5], b[6], b[7], b[8], b[9], b[10])
        } else "H" == b[0] ? (k = a.j.getHybridTracker(b[1], b[2]), k[b[3]](b[4], b[5], b[6], b[7], b[8], b[9], b[10], b[11])) : (k = a.j.getTracker(b[0]), k[b[1]](b[2], b[3], b[4], b[5], b[6], b[7], b[8], b[9]))
    }

    Function.prototype.gsbind = function (a) {
        function k() {
            return e.apply(this instanceof g ? this : a, b.concat(Array.prototype.slice.call(arguments)))
        }

        function g() {
        }

        if ("function" !== typeof this) throw new TypeError("Function.prototype.bind - what is trying to be bound is not callable");
        var b = Array.prototype.slice.call(arguments, 1), e = this;
        this.prototype && (g.prototype = this.prototype);
        k.prototype = new g;
        return k
    };
    var c = window, b = document, m = b.referrer, z = b.documentElement, d = location,
        q = navigator.userAgent.toLowerCase(), r = Math, w, A, B, h, f, l, p, y = Array.prototype.slice, v = Number,
        E = eval, e = a.b;
    w = e.lower;
    A = e.indexOf;
    B = e.encode;
    h = e.decode;
    f = e.isArray;
    l = e.Cc;
    p = e.sa;
    var G = function () {
        function b(b, g) {
            this.se = a.b.Ma();
            this.qc = 0;
            this.Ca = "http" + ("https:" == d.protocol ? "s" : "") + "://impression.gridsumdissector.com/gs.gif";
            var k = (new H(d.href)).kc();
            this.a = g;
            this.pe = document.referrer || "";
            this.tc = e.ic();
            this.rc = k.gsfguid || "root";
            this.sc = k.gsfopenid || "root";
            this.ke = k.gsdestination || "article";
            this.Na = k.gslevel || 0;
            this.pc = k.gsadid;
            this.ie = g.h.i.uid;
            if (null != b && b.openid) this.Oa = b.openid || "", this.ne = b.nickname || "", this.le = b.sex + "" || "", this.oe = b.province || "", this.he = b.city || "", this.je = b.country || "", this.me = b.headimgurl || "", this.te = b.unionid || "", this.qe = b.subscribe || ""; else {
                var k = "gs-uuid-" + this.pc, u;
                try {
                    u = c.localStorage.getItem(k)
                } catch (x) {
                }
                if (!u) {
                    u = a.b.P(k) || e.ic();
                    try {
                        c.localStorage.setItem(k, u)
                    } catch (x) {
                    }
                }
                this.Oa = u;
                a.b.W(k, this.Oa, 63072E3)
            }
            this.af();
            this.bf()
        }

        b.prototype.bf = function () {
            var a = this, g, b = a.ob("wc_pv");
            a.Na++;
            b.gsreferrer = a.pe;
            b.gsfopenid = a.sc;
            b.gsfguid = a.rc;
            b.gslevel = a.Na;
            b.gsdestination = a.ke;
            b.gsnickname = a.ne;
            b.gsgender = a.le;
            b.gsprovince = a.oe;
            b.gscity = a.he;
            b.gscountry = a.je;
            b.gsheadimgurl = a.me;
            b.gsunionid = a.te;
            b.gssubscribe = a.qe;
            -1 != q.indexOf("micromessenger") ? -1 != q.indexOf("windowswechat") ? (b.gsnettype = "wifi", a.a.h.sender.send(b, void 0, a.Ca)) : wx.ready(function () {
                wx.getNetworkType({
                    success: function (a) {
                        g = a.networkType
                    }, complete: function () {
                        b.gsnettype = g;
                        a.a.h.sender.send(b, void 0, a.Ca)
                    }
                })
            }) : (b.gsnettype = g, a.a.h.sender.send(b, void 0, a.Ca));
            var e = (new Date).getTime();
            window.addEventListener("beforeunload", function () {
                var g = (new Date).getTime();
                a.qc = 0 >= g -
                e ? 1 : Math.round((g - e) / 1E3);
                g = a.ob("wc_ul");
                g.gsduration = a.qc;
                a.a.h.sender.send(g, void 0, a.Ca)
            })
        };
        b.prototype.ob = function (b) {
            return {
                gsversion: a.j.version,
                gscmd: b,
                gsadid: this.pc,
                gsguid: this.tc,
                gsopenid: this.Oa,
                gstime: e.ge(new Date),
                gstimezone: this.se,
                gscookieid: this.ie
            }
        };
        b.prototype.af = function () {
            var a = this, g = wx.onMenuShareTimeline;
            wx.onMenuShareTimeline = function (b) {
                g(a.Oc(b, "timeline"))
            };
            var b = wx.onMenuShareAppMessage;
            wx.onMenuShareAppMessage = function (g) {
                b(a.Oc(g, "friend"))
            }
        };
        b.prototype.Oc = function (a, g) {
            var b = this, k = {}, e;
            for (e in a) k[e] = a[e];
            var c = k.success;
            k.success = function () {
                c && c();
                b.Vc(g, 1)
            };
            var d = k.cancel;
            k.cancel = function () {
                d && d();
                b.Vc(g, 0)
            };
            k.type = 0;
            k.link = b.Cd(k.link, g);
            return k
        };
        b.prototype.Vc = function (a, g) {
            var b = this.ob("wc_sh");
            b.gsfguid = this.rc;
            b.gsfopenid = this.sc;
            b.gsdestination = a;
            b.gslevel = this.Na;
            b.gsstatus = g;
            this.a.h.sender.send(b, void 0, this.Ca)
        };
        b.prototype.Cd = function (b, g) {
            b = b ? b.trim() : "";
            var k = new H(b), c = "gsfopenid=" + this.Oa + "&gsdestination=" + g + "&gslevel=" + this.Na + "&gsfguid=" +
                this.tc;
            if (0 == b.indexOf("https://open.weixin.qq.com/")) var d = new H(k.kc().redirect_uri),
                c = "redirect_uri=" + a.b.encode(e.va(d.toString(), c, ["gsfopenid", "gsdestination", "gslevel", "gsfguid"])),
                k = e.va(k.toString(), c, ["redirect_uri"]); else k = e.va(k.toString(), c, ["gsfopenid", "gsdestination", "gslevel", "gsfguid"]);
            return k.toString()
        };
        return b
    }(), F = function () {
        function a(a, g, b) {
            this.host = a;
            this.ef = g || [];
            this.Te = b || []
        }

        a.prototype.sf = function (a) {
            var g = this.host;
            return p(g) ? -1 < A(a, g) : g.test && g.test(a)
        };
        a.prototype.match = function (a) {
            var g, b, k, c = 0;
            b = e.ta(a);
            a = {};
            var d = this.ef, f = this.Te, h = b.host;
            if (this.sf(h)) {
                if (k = b.g) {
                    for (g in k) l(k, g) && (k[w(g)] = k[g]);
                    for (g = 0; g < d.length; g++) if (b = k[d[g]]) a[d[g]] = b, c++; else return !1;
                    for (g = 0; g < f.length; g++) if (b = k[f[g]]) a[f[g]] = b, c++
                } else if (d.length) return !1;
                return {host: h, g: a, Ue: c}
            }
            return !1
        };
        return a
    }();
    a.nd = F;
    var J = function (b) {
        function k() {
            var a = null !== b && b.apply(this, arguments) || this;
            a.S = 0;
            return a
        }

        __extends(k, b);
        k.prototype.V = function (g, b, k) {
            if (!document.body || "on" !== document.body.getAttribute("gswp")) {
                var t = this;
                t.S++;
                g.rd = e.ra(5);
                var c = t.a.c, d = new Image(1, 1), u = {};
                a.j.execHook("sender.send", g, k, u);
                if (!u.cancel) {
                    if ("spv" == g.gscmd || "ecom" == g.gscmd || "ev" == g.gscmd) void 0 == g.dedupid && (g.dedupid = e.A()), t.appendData(g, b, k);
                    void 0 !== g.gsversion && (g.gssrvid = "", g.rd = "");
                    b = t.rb(g, b, k).substring(0, 2E3);
                    d.onerror = function () {
                        t.S--;
                        t.S = 0 > t.S ? 0 : t.S;
                        e.f(c, "SendingFailed", {cmd: g.gscmd, url: k})
                    };
                    d.onload = function () {
                        t.S--;
                        t.S = 0 > t.S ? 0 : t.S;
                        void 0 != g.dedupid && t.cf(g.dedupid, k);
                        if (0 == t.S) {
                            var a = t.Ve();
                            a && (a.obj.gsdelay = e.Aa() -
                                a.obj.gsltime, t.send(a.obj, a.noEncode, a.destUrl))
                        }
                    };
                    d.src = b
                }
            }
        };
        return k
    }(a.Qb), X = function () {
        function a(a) {
            this.a = a
        }

        a.prototype.parse = function (a) {
            try {
                var g, b, k = this.a.zb, c = this.a.L, f = this.a.J;
                a = a || d.href;
                var h = e.ta(a), m = {
                    protocol: h.protocol,
                    local: h.local,
                    host: h.host,
                    path: h.fullPath,
                    anchor: h.anchor,
                    g: h.g
                };
                k && h.anchor && (m.path += "#" + h.anchor);
                if (f) m.J = f; else if (0 !== c.length && h.g) {
                    for (var l in h.g) for (g = 0; g < c.length; g++) w(l) == c[g] && delete h.g[l];
                    for (g = 0; g < c.length; g++) delete h.g[c[g]];
                    (b = e.D(h.g, "=", "&", !1, !0)) && (b = "?" + b);
                    k && h.anchor && (b += "#" + h.anchor);
                    m.J = [h.protocol, "://", h.host, h.path, b].join("")
                } else m.J = [h.protocol, "://", h.host, m.path].join("");
                if (!m.local) {
                    var n = e.fc(a, this.a);
                    m.I = n
                }
                return m
            } catch (ba) {
                e.f(this.a.c, "M_Url", ba)
            }
            return null
        };
        return a
    }(), R = function () {
        function b(b) {
            this.a = b;
            this.m = b.h.appVersion ? new a.Cf(b) : b.ac ? new a.ld(b) : new a.Za(b);
            this.ja = {};
            this.da = {}
        }

        b.prototype.update = function () {
            var a, g = this.uid, b = this.ea, c = [], d = [];
            for (a in this.ja) l(this.ja, a) && c.push(a + ":" + B(this.ja[a]));
            0 < c.length && (g = g + "|" + c.join("|"));
            for (a in this.da) l(this.da, a) && d.push(a + ":" + B(this.da[a]));
            0 < d.length && (b = b + "|" + d.join("|"));
            e.Ka() != g && this.m.set("_gscu", g, 63072E3);
            this.m.set("_gscs", b, 1800);
            this.m.set("_gscbrs", "1")
        };
        b.prototype.parse = function (a) {
            if (!a) return null;
            var g;
            g = /[^\d\w-]+/i;
            var b = {}, k = {};
            a = a.split("|");
            var e;
            if (0 == a[0].length || 36 < a[0].length || g.test(a[0]) || "null" == a[0]) return null;
            b.id = a[0];
            for (g = 1; g < a.length; g++) e = a[g].split(":"), k[e[0]] = h(e[1]);
            b.data = k;
            return b
        };
        b.prototype.B = function (a) {
            try {
                var g, b = void 0, k = void 0, c = void 0, f = void 0, C = "";
                this.ja = {};
                this.da = {};
                this.a.Jd && (g = e.R(d.href.replace("#", "&"), "_gsc")) && (g = g.split(";"), 2 == g.length && (c = h(g[0]), f = h(g[1]), b = 1, k = !0));
                k || (c = this.m.get("_gscu"), f = this.m.get("_gscs"), b = this.m.get("_gscbrs"));
                (c = this.parse(c)) ? (this.uid = c.id, this.ja = c.data, (f = this.parse(f)) ? (this.ea = f.id, this.da = f.data) : (!f && b && (C = "t"), this.ea = C + e.A())) : (this.uid = e.A(), this.ea = e.A());
                a || this.update()
            } catch (D) {
                e.f(this.a.c, "M_User", D), this.uid = e.A(), this.ea = e.A(), this.ja = {}, this.da = {}, this.update()
            }
        };
        b.prototype.Tc = function (a, g) {
            this.da[a] = g + "";
            this.update()
        };
        b.prototype.dd = function (a) {
            var g = this.m.get("_gsref");
            !g && a && (g = a + "");
            g && this.a.jf && this.m.set("_gsref", g, 1800)
        };
        b.prototype.ee = function () {
            return this.m.get("_gsref")
        };
        b.prototype.get = function (a) {
            return this.ja[a] || this.da[a] || null
        };
        b.prototype.D = function () {
            return "_gsc=" + this.m.get("_gscu") + ";" + this.m.get("_gscs")
        };
        b.prototype.Ee = function () {
            var a = this.a.Sc;
            return e.qa(this.uid) % 1E4 < 100 * a
        };
        return b
    }(), aa = function () {
        function a(a, g) {
            this.value = this.key = "";
            try {
                this.index = g, -1 !== a.indexOf("=") && (this.key = a.split("=")[0], this.value = a.split("=")[1])
            } catch (t) {
                this.key = a
            }
        }

        a.$d = function (b) {
            for (var g = [], k = 0; k < b.length; k++) g.push(new a(b[k], k));
            return g
        };
        return a
    }(), Q = function () {
        function a() {
        }

        a.nf = function (a) {
            for (var g = 0; g < a.length - 1; g++) {
                for (var b = g, k = g + 1; k < a.length; k++) a[k].value.length > a[b].value.length && (b = k);
                b !== g && (k = a[b], a[b] = a[g], a[g] = k)
            }
            return a
        };
        a.fe = function (b, g) {
            for (var k = [], c = 0; c < b.length; c++) 100 < b[c].value.length && -1 === e.indexOf(g, b[c].key) && k.push(b[c]);
            return a.nf(k)
        };
        a.prototype.de = function (b) {
            var g;
            if (!b) try {
                c.top._gsUtility ? b = m : (b = c.top.document.referrer, g = 1)
            } catch (I) {
                b = m
            }
            if (!b) try {
                c.opener && (b = c.opener.location.href)
            } catch (I) {
            }
            if (700 >= b.length) return [b, g];
            var k = "eqid wd word q p query w search keyword kw".split(" "), d = b.indexOf("?"), f = b.substr(0, d);
            if (-1 !== d) {
                var h = b.length;
                b = b.substr(d + 1).split("&");
                for (var d = aa.$d(b), d = a.fe(d, k), C = 0; C < d.length; C++) {
                    if (700 >= h) return [f + "?" + b.join("&"), g];
                    var l = d[C].value, n = l.substr(0, l.length / 2);
                    b[d[C].index] = d[C].key + "=" + n;
                    h -= l.length - n.length
                }
                for (d = b.length - 1; 0 <= d && !(700 >= h); d--) -1 === e.indexOf(k, b[d].split("=")[0]) && (h = h - b[d].length - 1, b.splice(d, 1));
                return [f + "?" + b.join("&"), g]
            }
            return [b, g]
        };
        return a
    }();
    a.Ef = Q;
    var Y = function () {
        function d(a) {
            this.a = a;
            this.h = a.h;
            this.origin = a.origin
        }

        d.prototype.isEnabled = function () {
            return this.a.U ? 100 == this.a.Fa ? !0 : r.round(1E4 * r.random()) < 100 * this.a.Fa : !1
        };
        d.prototype.Nb = function () {
            if (this.a.oa) {
                var a = (e.pb() - this.a.oa) / 2;
                this.offsetX = 0 < a ? a : 0;
                this.offsetY = 0
            } else this.origin ? (a = e.o(this.origin), this.offsetX = a.x, this.offsetY = a.y) : this.offsetY = this.offsetX = 0
        };
        d.prototype.o = function (a, b) {
            this.Nb();
            return this.Ba({x: a - this.offsetX, y: b - this.offsetY})
        };
        d.prototype.Ba = function (a) {
            a.x = r.round(a.x);
            a.y = r.round(a.y);
            return a
        };
        d.prototype.V = function (k, g, t, d) {
            var f, h = v(c[this.a.Wc] || 0), u = this.h.getCommon("mc"), m = this.h.url.parse();
            f = {};
            -1 < h && 256 > h || (h = 0);
            a.j.execHook("heatmap.send", u, k, g, t, d, f);
            if (!f.cancel) {
                t = d.button;
                e.Pa() && (1 == t ? t = 0 : 4 == t && (t = 1));
                u.btn = t;
                t = e.s(null, d, "A", null, 3);
                if (null != t) u.lk = t.href, u.lt = e.ia(t, "title") + t.title || e.ia(t, "alt") || e.ha(t), f = e.o(t), f = this.o(f.x, f.y), u.lx = f.x, u.ly = f.y, u.lw = r.round(t.offsetWidth), u.lh = r.round(t.offsetHeight); else if (this.a.Le) return;
                t = e.s(null, d, null, {gsregion: ""}) || e.s(null, d, null, {"data-gsregion": ""});
                if (null != t && (f = v(t.getAttribute("gsregion") || v(t.getAttribute("data-gsregion"))), -1 < f && 256 > f)) {
                    u.re = f;
                    if ("1" == t.getAttribute("gsposfixed") || "1" == t.getAttribute("data-gsposfixed")) f = e.o(t), f = this.o(f.x, f.y), k -= f.x, g -= f.y;
                    if (t = e.s(null, d, null, {gssnapshot: ""}) || e.s(null, d, null, {"data-gssnapshot": ""})) if (h = v(t.getAttribute("gssnapshot") || v(t.getAttribute("data-gssnapshot"))), 0 > h || 255 < h) h = 0
                }
                u.gspver = this.a.Sa;
                this.a.O ? (k = e.o(this.a.O), u.gsmcoffsetx = Math.round(d.pageX + this.a.O.scrollLeft - k.x), u.gsmcoffsety = Math.round(d.pageY + this.a.O.scrollTop - k.y)) : (u.gsmcoffsetx = k, u.gsmcoffsety = g);
                d = [m.protocol, "://", m.host, m.path];
                u.gsmcurl = d.join("");
                u.gstl = this.a.Ia || b.title;
                u.gssn = h;
                u.gsorurl = this.a.J;
                u.gsscr = screen.width + "*" + screen.height;
                this.h.sender.send(u)
            }
        };
        d.prototype.C = function (a) {
            if (!this.za(a)) {
                var b = (new Date).getTime();
                if (!(100 > b - this.aa)) {
                    this.aa = b;
                    try {
                        if (this.isEnabled()) {
                            var k = w(a.target.tagName);
                            if (void 0 !== k && "body" != k && "html" != k) {
                                var d = a.pageX, c = a.pageY;
                                e.l && (d = e.l.la, c = e.l.ma, e.l = null);
                                var f = this.o(d, c);
                                this.V(f.x, f.y, a.srcElement, a)
                            }
                        }
                    } catch (C) {
                        e.f(this.a.c, "M_Heatmap_doc", C)
                    }
                }
            }
        };
        d.prototype.vb = function (a, b) {
            if (!this.za(b)) {
                var g = (new Date).getTime();
                if (!(100 > g - this.aa)) {
                    this.aa = g;
                    try {
                        var k = b.clientX, d = b.clientY;
                        e.l && (k = e.l.la, d = e.l.ma, e.l = null);
                        var c = this.Ba(e.o(a)), f = this.o(k, d);
                        this.V(f.x + c.x, f.y + c.y, a, b)
                    } catch (D) {
                        e.f(this.a.c, "M_Heatmap_iframe", D)
                    }
                }
            }
        };
        d.prototype.za = function (a) {
            return e.l && e.l.la == a.pageX && e.l.ma == a.pageY
        };
        d.prototype.wa = function () {
            var a = this, g, d = a.a.xc, c = frames;
            if (0 == d.length) for (g = 0; g < c.length; g++) try {
                var f = c[g].frameElement || c[g];
                if (f.contentDocument || c[g].document) f.contentDocument = f.contentDocument || c[g].document, d.push(f)
            } catch (D) {
            }
            for (g = 0; g < d.length; g++) if (c = e.T(d[g])) try {
                var c = c.frameElement || c, h = c.contentDocument, m = function (b) {
                    return function (g) {
                        a.vb(b, g)
                    }
                }(c);
                void 0 !== b.ontouchstart && e.Ha(h, m.bind ? m.bind(a) : m.gsbind(a));
                e.observe(h, "mouseup", m.bind ? m.bind(a) : m.gsbind(a))
            } catch (D) {
            }
        };
        d.prototype.bind = function () {
            !this.xb && this.a.U && (this.xb = !0, void 0 !== b.ontouchstart && e.Ha(b, this.C.bind ? this.C.bind(this) : this.C.gsbind(this)), e.observe(b, "mouseup", this.C.bind ? this.C.bind(this) : this.C.gsbind(this)), /loaded|complete/.test(b.readyState) ? this.wa() : e.observe(c, "load", this.wa.bind ? this.wa.bind(this) : this.wa.gsbind(this)))
        };
        d.prototype.B = function () {
            this.bind()
        };
        return d
    }(), Z = function () {
        function a(a) {
            this.a = a;
            this.Qa = [];
            this.ca = []
        }

        a.prototype.sd = function (a, b, e) {
            b = v(b);
            this.Qa.push({ba: a + "", Ta: b || 0, Ua: 0, currency: e, Db: [], Qc: !b})
        };
        a.prototype.td = function (a, b, d, c, f, h, m, l) {
            try {
                var g, k = void 0, t = this.Qa;
                a += "";
                c = v(c) || 0;
                f = v(f) || 0;
                for (g = 0; g < t.length; g++) if (t[g].ba == a) {
                    k = t[g];
                    break
                }
                k || (k = {ba: a, Ta: 0, Ua: 0, currency: "", Db: [], Qc: !0}, t.push(k));
                var u = k.Qc, x = v((c * f).toFixed(2)), n;
                d && !e.sa(d) && (n = d.spu, d = d.sku);
                a = {
                    orderid: a,
                    name: b,
                    sku: d,
                    spu: n,
                    quantity: f,
                    unitPrice: c,
                    price: x,
                    category: h,
                    currency: l
                };
                m && (a.procp = e.D(m, ":", ",", !0, !1));
                k.Ua += a.quantity;
                k.Db.push(a);
                u && (k.Ta = v((k.Ta + x).toFixed(2)))
            } catch (N) {
                e.f(this.a.c, "FC_addProduct", N)
            }
        };
        return a
    }(), da = function () {
        function f(a) {
            this.aa = 0;
            this.a = a;
            this.h = a.h;
            this.origin = a.origin;
            this.Be();
            a.K && this.wb()
        }

        f.prototype.isEnabled = function () {
            return this.a.K ? 100 == this.a.Fa ? !0 : r.round(1E4 * r.random()) < 100 * this.a.Fa : !1
        };
        f.prototype.Nb = function () {
            if (this.a.oa) {
                var a = (e.pb() - this.a.oa) / 2;
                this.offsetX = 0 < a ? a : 0;
                this.offsetY = 0
            } else this.origin ? (a = e.o(this.origin), this.offsetX = a.x, this.offsetY = a.y) : this.offsetY = this.offsetX = 0
        };
        f.prototype.o = function (a, b) {
            this.Nb();
            return this.Ba({x: a - this.offsetX, y: b - this.offsetY})
        };
        f.prototype.Ba = function (a) {
            a.x = r.round(a.x);
            a.y = r.round(a.y);
            return a
        };
        f.prototype.ue = function (a) {
            for (var b = a.attributes, e = 0; e < b.length; e++) if ("function" === typeof a[b[e].name]) return !0;
            return !1
        };
        f.prototype.V = function (k, g, d, f) {
            var t, h = v(c[this.a.Wc] || 0), u = this.h.getCommon("ub"), m = this.h.url.parse(), l = {}, n;
            -1 < h && 256 > h || (h = 0);
            var p = a[this.a.ib + "_" + e.qb(this.a.c)] || a[this.a.ib] || c[this.a.ib];
            if (!this.hb && p) {
                p = new a.hd(p, e.qb(this.a.c));
                try {
                    t = E("(" + p.Md() + ")")
                } catch (T) {
                }
                this.hb = t && new a.gd(t)
            }
            a.j.execHook("codeless.send", u, k, g, d, f, l);
            if (!l.cancel && (l = f.button, e.Pa() && (1 == l ? l = 0 : 4 == l && (l = 1)), u.btn = l, l = e.s(null, f, "A", null, 3), null != l && (n = u.lk = l.href, u.lt = e.ia(l, "title") + l.title || e.ia(l, "alt") || e.ha(l), t = e.o(l), t = this.o(t.x, t.y), u.lx = t.x, u.ly = t.y, u.lw = r.round(l.offsetWidth), u.lh = r.round(l.offsetHeight)), f)) {
                u.ubtype = "click";
                u.tgcg = "selector";
                l = new a.kd(d);
                t = "A" == d.tagName ? e.Xa(encodeURIComponent(e.ha(d)), 270) : e.Xa(encodeURIComponent(l.N), 270);
                var p = l.getData(), q;
                for (q in p) u[q] = p[q];
                this.cd = e.A();
                u.ubid = this.cd;
                u.eljs = this.ue(d) ? 1 : "";
                this.hb && this.hf(this.hb.Xd(l), t, n);
                l = e.s(null, f, null, {gsregion: ""}) || e.s(null, f, null, {"data-gsregion": ""});
                if (null != l && (d = v(l.getAttribute("gsregion") || v(l.getAttribute("data-gsregion"))), -1 < d && 256 > d)) {
                    u.re = d;
                    if ("1" == l.getAttribute("gsposfixed") || "1" == l.getAttribute("data-gsposfixed")) t = e.o(l), t = this.o(t.x, t.y), k -= t.x, g -= t.y;
                    if (l = e.s(null, f, null, {gssnapshot: ""}) || e.s(null, f, null, {"data-gssnapshot": ""})) if (h = v(l.getAttribute("gssnapshot") || v(l.getAttribute("data-gssnapshot"))), 0 > h || 255 < h) h = 0
                }
                u.gspver = this.a.Sa;
                u.gsmcoffsetx = k;
                u.gsmcoffsety = g;
                k = e.o(f.target);
                u.gselmw = f.target.offsetWidth;
                u.gselmh = f.target.offsetHeight;
                u.gsmcelmx = Math.round(f.pageX - k.x + f.target.scrollLeft);
                u.gsmcelmy = Math.round(f.pageY - k.y + f.target.scrollTop);
                f = [m.protocol, "://", m.host, m.path];
                u.gsmcurl = f.join("");
                u.gstl = this.a.Ia || b.title;
                u.gssn = h;
                u.gsorurl = this.a.J;
                u.gsscr = screen.width + "*" + screen.height;
                this.h.sender.send(u)
            }
        };
        f.prototype.hf = function (b, g, e) {
            try {
                for (var d = 0; d < b.length; d++) {
                    var k = b[d], c = k.ab;
                    if (0 == k.qd) {
                        var f = c.Pd, t = {};
                        try {
                            var h = c.$b, l;
                            for (l in c.$b) {
                                var m = h[l];
                                t[m.key] = (new a.md(m.value)).Xe
                            }
                        } catch (M) {
                        }
                        this.h.ad(c.Od, c.Qd, f, null, t, this.cd, g, e)
                    }
                }
            } catch (M) {
            }
        };
        f.prototype.Be = function () {
            try {
                var a = {}, b = e.ta(d.href).g, c, f;
                b && (c = b.gs_file, f = b.gs_url);
                if (c && f) {
                    e.lb("_gswp");
                    for (var h in b) 0 == h.indexOf("gs_") && (a[h] = b[h]);
                    e.W("_gswp", JSON.stringify(a), 1800);
                    this.Se(decodeURIComponent(f))
                } else {
                    var l = e.P("_gswp");
                    try {
                        a = JSON.parse(l || "{}")
                    } catch (C) {
                    }
                    a.gs_file && this.zc((a.gs_protocol && decodeURIComponent(a.gs_protocol) || d.protocol) + decodeURIComponent(a.gs_file))
                }
            } catch (C) {
            }
        };
        f.prototype.Se = function (a) {
            var g = b.createElement("iframe");
            g.src = "javascript:\"<script>top.location.replace('" + a + "')\x3c/script>\"";
            c.setInterval(function () {
                b.body && b.body.appendChild(g)
            }, 500)
        };
        f.prototype.wb = function () {
            try {
                12 != this.a.Mb.length && this.zc("http" + ("https:" == d.protocol ? "s" : "") + "://static.gridsumdissector.com/js/Clients/" + this.a.Mb + "/ubcfg.js")
            } catch (k) {
            }
        };
        f.prototype.zc = function (a) {
            if (b.querySelectorAll) for (var g = b.querySelectorAll("script[async]"), e = 0; e < g.length; e++) if (g[e].src && -1 < g[e].src.indexOf("ubcfg.js")) return;
            g = b.createElement("script");
            e = b.getElementsByTagName("script")[0];
            g.type = "text/javascript";
            g.async = !0;
            g.src = a;
            e.parentNode.insertBefore(g, e)
        };
        f.prototype.C = function (a) {
            if (!this.za(a)) {
                var b = (new Date).getTime();
                if (!(100 > b - this.aa)) {
                    this.aa = b;
                    try {
                        if (this.isEnabled()) {
                            var d = w(a.target.tagName);
                            if (void 0 !== d && "body" != d && "html" != d) {
                                var c = a.pageX, k = a.pageY;
                                e.l && (c = e.l.la, k = e.l.ma, e.l = null);
                                var f = this.o(c, k);
                                this.V(f.x, f.y, a.target, a)
                            }
                        }
                    } catch (C) {
                        e.f(this.a.c, "M_Codeless_doc", C)
                    }
                }
            }
        };
        f.prototype.vb = function (a, b) {
            if (!this.za(b)) {
                var g = (new Date).getTime();
                if (!(100 > g - this.aa)) {
                    this.aa = g;
                    try {
                        var d = b.clientX, c = b.clientY;
                        e.l && (d = e.l.la, c = e.l.ma, e.l = null);
                        var k = this.Ba(e.o(a)), f = this.o(d, c);
                        this.V(f.x +
                            k.x, f.y + k.y, a, b)
                    } catch (D) {
                        e.f(this.a.c, "M_Heatmap_iframe", D)
                    }
                }
            }
        };
        f.prototype.za = function (a) {
            return e.l && e.l.la == a.pageX && e.l.ma == a.pageY
        };
        f.prototype.wa = function () {
            var a = this, g, d = a.a.xc, c = frames;
            if (0 == d.length) for (g = 0; g < c.length; g++) try {
                var f = c[g].frameElement || c[g];
                if (f.contentDocument || c[g].document) f.contentDocument = f.contentDocument || c[g].document, d.push(f)
            } catch (D) {
            }
            for (g = 0; g < d.length; g++) if (c = e.T(d[g])) try {
                var c = c.frameElement || c, h = c.contentDocument, l = function (b) {
                    return function (g) {
                        a.vb(b, g)
                    }
                }(c);
                void 0 !== b.ontouchstart && e.Ha(h, l.bind ? l.bind(a) : l.gsbind(a));
                e.observe(h, "mouseup", l.bind ? l.bind(a) : l.gsbind(a))
            } catch (D) {
            }
        };
        f.prototype.bind = function () {
            !this.xb && this.a.K && (this.xb = !0, void 0 !== b.ontouchstart && e.Ha(b, this.C.bind ? this.C.bind(this) : this.C.gsbind(this)), e.observe(b, "mouseup", this.C.bind ? this.C.bind(this) : this.C.gsbind(this)))
        };
        f.prototype.B = function () {
            this.bind()
        };
        return f
    }(), U = function () {
        return function (e) {
            this.ib = "gsconfig";
            this.Mb = "GWD-002808-030F33";
            this.Sb = [];
            this.Dc = !0;
            var c = d.hostname;
            this.I = {};
            this.Pc = {};
            this.Ra = null;
            this.c = e;
            this.Va = ["http" + ("https:" == d.protocol ? "s" : "") + "://recv-wd.gridsumdissector.com/gs.gif", "http" + ("https:" == d.protocol ? "s" : "") + "://www.webdissector.com/recv/gs.gif"];
            this.Da = "//www.webdissector.cn/js/heatmap_v" + a.j.version + ".js";
            this.Ze = "//www.addissector.com/";
            this.$e = "/redirect.gif";
            this.Vb = "utm_campaign";
            this.Lc = "utm_medium";
            this.Xc = "utm_source";
            this.oc = "utm_adgroup";
            this.Fc = "utm_term";
            this.Zb = "utm_content";
            this.Wb = "utm_channel";
            this.pd = "utm_account";
            this.Ub = "gsadid";
            this.fb = this.Vb;
            this.Bb = this.Lc;
            this.Jb = this.Xc;
            this.sb = this.oc;
            this.Ab = this.Fc;
            this.jb = this.Zb;
            this.gb = this.Wb;
            this.od = this.pd;
            this.Tb = this.Ub;
            this.L = ["gclid", "bdclkid", "gs_ws", this.fb, this.Bb, this.Jb, this.sb, this.Ab, this.jb, this.gb, this.od, "gsadid", "gsabredir"];
            this.Hd = "content_";
            "www." == c.substring(0, 4) && (c = c.substring(4));
            this.domain = c;
            this.path = "/";
            this.kf = 1800;
            this.Sc = 100;
            this.origin = b.body;
            this.Fa = 100;
            this.xc = [];
            this.Wc = "GridsumSnapshotID";
            this.bd = "GSTS";
            this.Mc = {};
            this.zb = !0;
            this.Rb = "http://ctrl-ab.gridsumdissector.com/";
            this.ac = this.Ic = !0;
            this.Yb = "http://ctrl-ab.gridsumdissector.com/clientredir.html"
        }
    }();
    a.Af = U;
    var H = function () {
        function a(a) {
            var b;
            this.g = [];
            b = a.indexOf("?");
            var e = a.indexOf("#");
            -1 === b ? -1 === e ? (this.F = a, this.hash = b = "") : (this.F = a.substr(0, e), b = "", this.hash = a.substr(e + 1)) : -1 === e ? (this.F = a.substr(0, b), b = a.substr(b + 1), this.hash = "") : (this.F = a.substr(0, b), b = a.substr(b + 1, e - b - 1), this.hash = a.substr(e + 1));
            b && (this.g = b.split("&"))
        }

        a.prototype.cb = function (a, b) {
            this.Yc(a) || this.g.push(a + "=" + b)
        };
        a.prototype.bb = function (a, b) {
            if (!this.Yc(a)) {
                var g = e.encode(b);
                this.g.push(a + "=" + g)
            }
        };
        a.prototype.Dd = function (a, b) {
            b ? this.g.splice(a, 1, b) : this.g.splice(a, 1)
        };
        a.prototype.toString = function () {
            var a;
            a = 0 != this.g.length ? this.g.join("&") : "";
            return this.F + (0 === this.g.length ? "" : "?" + a) + ("" === this.hash ? "" : "#" + this.hash)
        };
        a.prototype.Yc = function (a) {
            for (var b = 0; b < this.g.length; b++) if (this.g[b].split("=")[0] === a) return !0;
            return !1
        };
        a.prototype.Gb = function () {
            var a = this.F.split("/"), b = a[a.length -
            1], e = [];
            if (!b) e.push(this.toString()), this.F = this.F.slice(0, -1); else if (3 === a.length || -1 === b.indexOf(".")) e.push(this.toString()), this.F += "/";
            e.push(this.toString());
            return e
        };
        a.prototype.kc = function () {
            for (var a = {}, b = 0; b < this.g.length; b++) {
                var e = this.g[b].split("=");
                2 > e.length || (a[e[0]] = e[1])
            }
            return a
        };
        return a
    }();
    a.$a = H;
    var V = function () {
        function b(a) {
            this.ub = "${heatMapConfigs}";
            this.h = a.h;
            this.ze()
        }

        b.prototype.ze = function () {
            var b;
            if (!e.sa(this.ub)) for (var g = 0; g < this.ub.length; g++) {
                b = this.ub[g];
                for (var c = "regex" == this.La(b.MatchType) ? new RegExp(b.MatchPattern, "i") : b.MatchPattern, f = this.be(b.MatchPatternType), h = 0; h < f.length; h++) a.b.yb(c, this.La(b.MatchType), f[h]) && (b.HostName && d.hostname != b.HostName || ("0" == b.Module ? this.xe(b) : "1" == b.Module ? this.ye(b) : "2" == b.Module && this.Ae()))
            }
        };
        b.prototype.xe = function (a) {
            this.h.enableHeatmap();
            this.h.setDocWidth(a.DocWidth);
            this.h.setPageVersion(a.PageVersion);
            this.h.setOriginalUrl(a.OriginalUrl)
        };
        b.prototype.ye = function (a) {
            this.h.enableScroll();
            this.h.setOriginalUrl(a.OriginalUrl)
        };
        b.prototype.Ae = function () {
            this.h.enableCodeless()
        };
        b.prototype.La = function (a) {
            return 0 === a ? "exactmatch" : 1 === a ? "startswith" : 2 === a ? "endswith" : 3 === a ? "contains" : 4 === a ? "regex" : ""
        };
        b.prototype.be = function (a) {
            return "0" == a ? [d.pathname] : (new H(d.href)).Gb()
        };
        return b
    }();
    a.zf = V;
    var W = function () {
        function l(a, b, e) {
            var g = new U(a);
            g.h = this;
            this.c = a;
            this.appVersion = b;
            this.ud = e;
            this.a = g
        }

        var k = l.prototype;
        k.check = function () {
            try {
                e.P("_gsHijack") || top == c || top.location.href != d.href || (e.f(this.c, "WebPageHijack"), e.W("_gsHijack", "1"))
            } catch (g) {
            }
        };
        k.isLocal = function () {
            if (this.a.vf) return !1;
            var a = d.hostname;
            return "file:" == d.protocol || -1 < A(a, "localhost") || 0 == A(a, "127.") || 0 == A(a, "192.168.") || 0 == A(a, "10.") || 0 == A(a, "172.")
        };
        k.isHeatmapModeOn = function () {
            var a = w(d.hash);
            return this.a.U && -1 < A(a, "#gwdheatmap&") && -1 < A(a, this.c.substring(4))
        };
        k.isDisable = function () {
            return !this.c || !this.appVersion && this.isLocal() || this.isHeatmapModeOn() || -1 < A(q, this.a.we) || !this.i.Ee()
        };
        k.getCommon = function (b) {
            var g = this.i;
            b = {
                gsver: a.j.version,
                gscmd: b,
                gssrvid: this.c,
                gsuid: g.uid,
                gssid: g.ea,
                pvid: this.Eb,
                gsltime: e.Aa(),
                gstmzone: e.Ma(),
                gsjp: this.a.Ge,
                gsdelay: null,
                rd: 1
            };
            this.a.Fd && (b.gscs = e.qa(b.gsver + b.gscmd + b.gssrvid + b.gsuid + b.gssid + b.gsltime, !0));
            return b
        };
        k.appendBrowserInfo = function (a) {
            a.gsscr = screen.width + "*" + screen.height
        };
        k.calculateDuration = function (a) {
            a = (v(new Date) - a) / 1E3;
            180 < a && (a = 180);
            0 > a && (a = 0);
            this.duration = a
        };
        k.sendHeartbeat = function (a, b, c) {
            this.vc || (this.trackHeartbeat(a, b), this.Gc = e.Aa(), c || (this.vc = 1))
        };
        k.eb = function (a) {
            a.gsst = this.a.O ? this.a.O.scrollTop : r.round(r.max(z ? z.scrollTop : 0, b.body ? b.body.scrollTop : 0, window.pageYOffset || 0));
            a.gswh = this.a.fd || c.innerHeight || (z ? z.clientHeight : null)
        };
        k.setCustomPageLoadListenerOnElement = function (a) {
            var b = this;
            try {
                var g, c = 0;
                for (g = 0; g < a.length; g++) document.querySelectorAll(a[g])[0].addEventListener("load", function () {
                    c++;
                    c == a.length && b.trackCustomPageLoad()
                })
            } catch (L) {
                e.f(this.c, "FC_setCustomPageLoadListenerOnElement", L)
            }
        };
        k.trackCustomPageLoad = function () {
            try {
                var a = c[this.a.bd] || this.yc, b = (v(new Date) -
                    a) / 1E3;
                180 < b && (b = 180);
                0 > b && (b = 0);
                this.Bd = b
            } catch (u) {
                e.f(this.c, "FC_trackCustomPageLoad", u)
            }
        };
        k.init = function () {
            var b = this;
            if (b.De) b.i.B(); else {
                b.i = new R(b.a);
                b.referrer = new Q;
                b.url = new X(b.a);
                b.G = new Z(b.a);
                b.sender = b.a.Ic ? new J(b.a) : new a.Qb(b.a);
                b.U = new Y(b.a);
                b.K = new da(b.a);
                b.i.B();
                new V(b.a);
                var f, h = a.j.plugins;
                for (f = 0; f < h.length; f++) {
                    var k = h[f];
                    b[k.name] = new k.rf(b.a)
                }
                b.isHeatmapModeOn() && b.showHeatmap();
                if (b.isDisable()) b.disabled = !0; else if (b.a.Ke ? e.observe(c, "load", function () {
                    b.U.B();
                    b.K.B()
                }) : (b.U.B(), b.K.B()), b.Eb = e.A(), b.yc = new Date, b.Hc = v(new Date), e.observe(c, "load", function () {
                    b.calculateDuration(c[b.a.bd] || b.yc)
                }), e.observe(c, "beforeunload", function () {
                    b.sendHeartbeat()
                }), !b.appVersion) var l, m = b.i.ea, n = b.i.uid, p = d.href, q = c.setInterval(function () {
                    if (b.a.Dc && p != d.href) b.$c(!0), p = d.href; else {
                        if (!b.tb) {
                            b.i.B(!0);
                            var a = b.i.get("pv");
                            l && l < a ? b.tb = 1 : b.i.ea != m && (b.tb = 1);
                            l = a
                        }
                        b.tb && null != b.duration && (b.sendHeartbeat(m, n), b.i.dd(b.Rc), c.clearInterval(q))
                    }
                }, 1E3);
                b.De = !0
            }
        };
        k.track = function (a, b, e) {
            this.$c(!1, a, b, e)
        };
        k.$c = function (a, c, f, k) {
            try {
                if (this.init(), !this.disabled) {
                    a && (this.vc = !1, this.sendHeartbeat(this.i.ea, this.i.uid));
                    var g = !1, t = this.a.Pc, l = this.a.Ra, u, n = this.i, p, q = this.url, x = this.getCommon("spv"),
                        r = c && f ? d.href : "", w = e.P("_gsdlorig_" + e.qb(this.a.c));
                    if (c) {
                        var g = !0, y = c.split("://", 2);
                        if (1 < y.length) {
                            if (-1 == y[1].indexOf(d.hostname)) {
                                e.f(this.c, "The url's domain is wrong.");
                                return
                            }
                            c = y[0] + "://" + y[1].replace(/\/+/g, "/")
                        } else c = c.replace(/\/+/g, "/")
                    } else this.Hc = v(new Date);
                    c = q.parse(c || d.href);
                    var K = this.referrer.de(r), r = K[0];
                    p = v(n.get("pv")) || 0;
                    0 === p && (x.gsfir = 1);
                    this.Ec && (x.pvid = "");
                    if (this.appVersion || a) this.Eb = e.A(), x.pvid = this.Eb;
                    x.gstl = this.a.Ia || b.title;
                    x.ubc = this.a.yd;
                    x.gscp = e.D(t, "::", "||", !1, !1);
                    x.pcp = l;
                    x.gstestid = "";
                    x.gstestverid = "";
                    x.fbr = "";
                    x.gsce = e.Ce() ? 1 : 0;
                    var B = e.Yd();
                    x.gsflver = B.Sd;
                    x.gssil = B.lf;
                    x.gsclr = screen.colorDepth || 32;
                    try {
                        x.gsje = navigator.javaEnabled() ? 1 : 0
                    } catch (O) {
                    }
                    this.eb(x);
                    this.a.O ? (x.gsph = this.a.O.scrollHeight, x.gspw = this.a.O.scrollWidth) : (x.gsph = z ? z.scrollHeight : null, x.gspw = z ? z.scrollWidth : null);
                    !0 === this.Uc && (x.gssce = 1);
                    for (var F in k) x[F] = k[F];
                    if (this.appVersion) x.gsurl = c.path; else {
                        var G = [c.protocol, "://", c.host, c.path].join("");
                        try {
                            e.Ka() ? (x.gsurl = e.va(G, w, ["utm_"]).toString(), w && (x.dlsrc = 1), x.emb = 1) : x.gsurl = G
                        } catch (O) {
                            x.gsurl = G
                        }
                        if (u = c.I) x.adcp = u.xa, x.adgp = u.group, x.adsr = u.source, x.admd = u.Ga, x.adkw = u.Ea, x.adct = u.content, x.adch = u.channel, x.adid = u.ua
                    }
                    this.appendBrowserInfo(x);
                    !g && this.a.J && (x.gsorurl = this.a.J);
                    this.Rc = x.gsref = r || "";
                    c.g && c.g.tid && c.g.tvid && (x.gstestid = c.g.tid, x.gstestverid = h(c.g.tvid), x.fbr = c.g.fbr, "" != x.gsref && 0 != x.gsref.indexOf(this.a.Rb) || void 0 == c.g.refurl || (x.gsref = h(c.g.refurl)));
                    this.uc && (x.gsref = this.uc);
                    x.notopjs = K[1];
                    this.sender.send(x);
                    n.dd(this.Rc);
                    a || this.Ec || n.Tc("pv", ++p);
                    this.Ec = !0;
                    if (this.Hb && 1 == p && (!m || -1 < A(m, this.Hb))) {
                        x.gscmd = "rpv";
                        var E = [this.a.Ze, e.qa(this.Hb), this.a.$e].join("");
                        this.sender.send(x, !1, E)
                    }
                    this.check();
                    this.uc = d.href
                }
            } catch (O) {
                e.f(this.c, "FC_track", O)
            }
        };
        k.trackLaunch = function (b) {
            var g = this;
            try {
                if (b || (document.addEventListener("pause", function () {
                    g.sendHeartbeat(void 0, void 0, !0)
                }, !1), document.addEventListener("resume", function () {
                    if (void 0 != g.Gc && g.Gc + 3E4 < e.Aa()) {
                        var a = e.A();
                        g.i.m.set("_gscs", a);
                        g.i.uid = a;
                        g.trackLaunch(!0)
                    }
                    g.track()
                }, !1)), (b || null == sessionStorage.getItem("gslaunched")) && c.device && (g.init(), !g.disabled)) {
                    var d = g.getCommon("launch");
                    d.gsmappver = g.appVersion;
                    d.gschannel = g.ud;
                    a.If.Hf(d);
                    d.gscp = e.D(g.a.Mc, "::", "||", !1, !1);
                    g.sender.send(d);
                    sessionStorage.setItem("gslaunched", "1")
                }
            } catch (x) {
                e.f(g.c, "FC_trackLaunch", x)
            }
        };
        k.trackLink = function (a, b, c, e) {
            var g = this;
            return g.bindEvent(b, "click", function () {
                g.track(a, !0)
            }, c, e)
        };
        k.trackECom = function () {
            try {
                if (this.init(), !this.disabled) {
                    var a, b, c, d, f = this.sender, h = this.G.Qa, k, l, m, n, p = this.i, q = p.get("_gsecom"),
                        q = q ? q.split(",") : [];
                    for (a = 0; a < h.length; a++) {
                        var r = this.getCommon("ecom");
                        l = h[a];
                        d = B(l.ba);
                        if (!(-1 < A(q, d))) {
                            q.push(d);
                            r.gsorderid = l.ba;
                            r.gstotal = l.Ta;
                            r.gsquan = l.Ua;
                            r.gscur = l.currency;
                            for (var v in this.G.ca) if (this.G.ca[v].ba == l.ba) {
                                r.ecp = this.G.ca[v].mb;
                                break
                            }
                            k = l.Db;
                            n = [];
                            b = 0;
                            for (c = k.length; b < c; b++) m = k[b], m = e.D(m, "::", ",,", !1, !0), n.push(m);
                            r.gsproducts = n.join("||");
                            if (f.Gd(r)) f.send(r); else for (b = 0; b < c; b++) {
                                var w = this.getCommon("ecom");
                                w.gsorderid = r.gsorderid;
                                w.gstotal = r.gstotal;
                                w.gsquan = r.gsquan;
                                w.gscur = r.gscur;
                                w.ecp = r.ecp;
                                m = k[b];
                                m = e.D(m, "::", ",,", !1, !0);
                                w.gsproducts = m;
                                f.send(w)
                            }
                        }
                    }
                    p.Tc("_gsecom", q.join(","));
                    this.G.Qa = []
                }
            } catch (ea) {
                e.f(this.c, "FC_trackECom", ea)
            }
        };
        k.trackClickthrough = function (a, b) {
            try {
                if (this.init(), !this.disabled && (a || b)) {
                    var g = this.getCommon("ct"), c = this.Je;
                    c && (g.gsssid = c, b && (g.url = b), g.gsclktl = a, g.gssresurl = d.href, this.sender.send(g))
                }
            } catch (L) {
                e.f(this.c, "FC_trackClickthrough", L)
            }
        };
        k.trackHeartbeat = function (a, b) {
            var g = this.getCommon("hb");
            try {
                var e = c.performance.timing, d = (e.loadEventEnd - e.navigationStart) / 1E3;
                g.plt = 0 <= d ? d : null
            } catch (C) {
            }
            g.pld = this.duration;
            g.cpld = this.Bd;
            e = (v(new Date) - this.Hc) / 1E3;
            0 > e && (e = 0);
            g.psd = e;
            this.eb(g);
            g.gssid = a || g.gssid;
            g.gsuid = b || g.gsuid;
            this.sender.send(g)
        };
        k.trackSiteSearch = function (a, b, c, f, h, k) {
            try {
                if (this.init(), !this.disabled) {
                    var g = this.getCommon("ss"), l = e.A();
                    f ? (g.gsskwd = e.R(d.href, a), g.gssenc = c || "utf-8", g.gsscat = e.R(d.href, b)) : c ? (g.gsskwd = a, g.gsscat = b, g.gssenc = c) : (g.gsskwd = B(a), g.gsscat = B(b), g.gssenc = "utf-8");
                    g.gsskwd && (g.gsssid = this.Je = l, k && (g.gsscnt = k), (h = h || m) && (g.gssref = h), g.gssresurl = d.href, this.sender.send(g))
                }
            } catch (I) {
                e.f(this.c, "FC_trackSiteSearch", I)
            }
        };
        k.trackEvent = function (a, b, c, d, f) {
            try {
                this.ad(a, b, c, d, f)
            } catch (C) {
                e.f(this.c, "FC_trackEvent", C)
            }
        };
        k.ad = function (a, c, f, h, k, l, m, n) {
            try {
                if (this.init(), !this.disabled) {
                    var g = this.getCommon("ev"), t = d.href;
                    g.eca = a;
                    g.eac = c;
                    g.eva = h;
                    g.ela = f;
                    if (k) {
                        a = "";
                        var u, p;
                        for (p in k) u ? a = a + "|" + p + ":" + k[p] : (a = p + ":" + k[p], u = !0);
                        g.eparams = a
                    }
                    g.tgtxt = m;
                    g.tghre = n;
                    g.ubid = l;
                    g.gstl = this.a.Ia || b.title;
                    t = this.url.parse(t);
                    g.gsourl = t.J;
                    this.sender.send(g)
                }
            } catch (ca) {
                e.f(this.c, "FC_trackUbEvent", ca)
            }
        };
        k.trackInternalLink = function () {
            return !0
        };
        k.uf = function (a) {
            try {
                if (this.init(), !this.disabled) {
                    var g = this.getCommon("ct");
                    g.gstype = 1;
                    g.url = a.href;
                    g.gsclktl = e.ia(a, "title") + a.title || e.ia(a, "alt") || e.ha(a);
                    g.gssresurl = d.href;
                    g.gstl = this.a.Ia || b.title;
                    var c = e.s(null, a, null, {gscampaign: ""});
                    null != c && (g.gscamp = c.getAttribute("gscampaign"));
                    c = e.s(null, a, null, {gsposition: ""});
                    null != c && (g.gspos = c.getAttribute("gsposition"));
                    c = e.s(null, a, null, {gsexpkey: ""});
                    null != c && (g.gsexpkey = c.getAttribute("gsexpkey"));
                    this.sender.send(g)
                }
            } catch (x) {
                e.f(this.c, "FC_trackInternalLink", x)
            }
        };
        k.trackLocation = function () {
            var a = this;
            try {
                a.init(), a.disabled || navigator.geolocation.getCurrentPosition(function (b) {
                    var g = a.getCommon("loc");
                    g.gsmlati = b.coords.latitude;
                    g.gsmlongi = b.coords.longitude;
                    a.sender.send(g)
                }, function () {
                }, {timeout: 6E4})
            } catch (t) {
                e.f(a.c, "FC_trackLocation", t)
            }
        };
        k.trackJunctionPoint = function (a, b) {
            try {
                if (this.init(), !this.disabled) {
                    var g = this.getCommon("jp");
                    void 0 == a ? (g.gsjpid = this.i.uid, g.gsjptype = 0) : (g.gsjpid = a, g.gsjptype = void 0 == b ? 0 : b);
                    this.sender.send(g)
                }
            } catch (x) {
                e.f(this.c, "FC_trackLogin", x)
            }
        };
        k.enableScroll = function () {
            var a = this;
            void 0 === a.Uc && (a.Uc = !0, e.observe(a.a.O || c, "scroll", function () {
                try {
                    if (a.init(), !a.disabled) {
                        var b = a.getCommon("sc");
                        a.eb(b);
                        b.gsorurl = a.a.J;
                        b.scid = e.A();
                        a.Ie = b.scid;
                        c.setTimeout(function () {
                            b.scid === a.Ie && (b.scid = null, a.sender.send(b))
                        }, 1E3)
                    }
                } catch (u) {
                    e.f(a.c, "FC_enableScroll", u)
                }
            }))
        };
        k.bindEvent = function (a, b, c, d, f) {
            f = f || {};
            return e.observe(a, b, function (b) {
                if (b && b.target) {
                    var g = e.s(a, b, d, f);
                    null != g && (b.Me = g, c(b))
                }
            })
        };
        k.bindSearchResults = function (a, b) {
            var g = this;
            return g.bindEvent(a, "click", function (a) {
                a = a.Me;
                g.trackClickthrough(e.ha(a), a.href)
            }, "a", b)
        };
        k.monitorSearchResults = function (a) {
            function b(a, b) {
                a.addEventListener ? a.addEventListener("click", b) : a.attachEvent("onclick", b)
            }

            for (var g = this, c = a.getElementsByTagName("a"), d = 0; d < c.length; d++) (function () {
                var a = c[d];
                b(a, function () {
                    g.trackClickthrough(e.ha(a), a.href)
                })
            })()
        };
        k.showHeatmap = function () {
            var g = this.a.Da;
            a.j.Da = d.href;
            var c = b.createElement("script");
            c.src = g;
            b.getElementsByTagName("head")[0].appendChild(c)
        };
        k.addOrder = function (a, b, c) {
            try {
                this.init(), this.disabled || this.G.sd(a, v(b), c ? c : "CNY")
            } catch (x) {
                e.f(this.c, "FC_addOrder", x)
            }
        };
        k.addProduct = function (a, b, c, d, f, h, k, l) {
            try {
                this.init(), this.disabled || this.G.td(a, b, c, v(d), v(f), h, k, l ? l : "CNY")
            } catch (I) {
                e.f(this.c, "FC_addProduct", I)
            }
        };
        k.setSessionTimeout = function (a) {
            1 > a || 3600 < a || (this.a.kf = a)
        };
        k.setBreadcrumb = function (a) {
            this.a.yd = a
        };
        k.setCampaign = function (a) {
            a && a.length && (this.a.I.xa = a)
        };
        k.setGroup = function (a) {
            a && a.length && (this.a.I.group = a)
        };
        k.setContent = function (a) {
            a && a.length && (this.a.I.content = a)
        };
        k.setKeyword = function (a) {
            a && a.length && (this.a.I.Ea = a)
        };
        k.setMedium = function (a) {
            a && a.length && (this.a.I.Ga = a)
        };
        k.setSource = function (a) {
            a && a.length && (this.a.I.source = a)
        };
        k.setAdid = function (a) {
            a && a.length && (this.a.I.ua = a)
        };
        k.setCampaignKey = function (a) {
            this.a.L.push(this.a.fb = w(a))
        };
        k.setMediumKey = function (a) {
            this.a.L.push(this.a.Bb = w(a))
        };
        k.setContentKey = function (a) {
            this.a.L.push(this.a.jb = w(a))
        };
        k.setSourceKey = function (a) {
            this.a.L.push(this.a.Jb = w(a))
        };
        k.setKeywordKey = function (a) {
            this.a.L.push(this.a.Ab = w(a))
        };
        k.setGroupKey = function (a) {
            this.a.L.push(this.a.sb = w(a))
        };
        k.setChannelKey = function (a) {
            this.a.L.push(this.a.gb = w(a))
        };
        k.setAdidKey = function (a) {
            this.a.L.push(this.a.Tb = w(a))
        };
        k.setContentNetworkPrefix = function (a) {
            this.a.Hd = a
        };
        k.setChannel = function (a, b, c) {
            b && (b = c ? e.R(m, b) : e.R(d.href, b)) && (a = b);
            a && 0 != a.length && (this.a.I.channel = a)
        };
        k.setIgnoreTrafficKeyword = function (a) {
            a && (this.a.we = a)
        };
        k.setCustomProperty = function (a, b, c, f) {
            var g = b;
            "cookie" == c ? g = e.P(f) || b : "query" == c && (g = e.R(d.href, f) || b);
            null != g && (this.a.Pc[a] = g)
        };
        k.setMobileLaunchProperty = function (a, b) {
            a && b && (this.a.Mc[a] = b)
        };
        k.setPageProperty = function (a, b) {
            null != a && null != b && (this.a.Ra || (this.a.Ra = {}), this.a.Ra[a] = b)
        };
        k.setEcomProperty = function (a, b, c) {
            if (null != a && null != b && null != c) {
                for (var g in this.G.ca) if (this.G.ca[g].ba == a) {
                    this.G.ca[g].mb[b] = c;
                    return
                }
                a = this.G.ca.push({ba: a, mb: {}});
                this.G.ca[a - 1].mb[b] = c
            }
        };
        k.setHeatmapScriptUrl = function (a) {
            this.a.Da = a
        };
        k.setPageName = function (a) {
            this.a.Ia = a
        };
        k.setServiceUrl = function (a) {
            this.a.Va = [a]
        };
        k.setServiceUrls = function (a) {
            f(a) || (a = y.call(arguments));
            this.a.Va = a
        };
        k.setJunctionPoint = function (a) {
            this.a.Ge = a
        };
        k.setCookieProperties = function (a, b, c) {
            a && "." == a.charAt(0) && (a = a.substring(1));
            0 <= d.host.indexOf(a) && (this.a.domain = a || this.a.domain);
            this.a.path = b || this.a.path;
            this.a.gf = !!c
        };
        k.setSamplingRate = function (a) {
            this.a.Sc = a
        };
        k.setClickSamplingRate = function (a) {
            this.a.Fa = a
        };
        k.setDocWidth = function (a) {
            this.a.oa = v(a);
            void 0 === document._gsDocWidth && (document._gsDocWidth = v(a))
        };
        k.setWindowHeight = function (a) {
            this.a.fd = v(a)
        };
        k.setOriginalUrl = function (a) {
            this.a.J = a
        };
        k.setOriginElement = function (a) {
            this.a.origin = e.T(a)
        };
        k.setPageVersion = function (a) {
            this.a.Sa = a
        };
        k.getWDCookieString = function () {
            this.init();
            return this.i.D()
        };
        k.jump = function (a) {
            var b = this.getWDCookieString();
            a = p(a) ? a : a.action;
            d.href = a + "#" + b
        };
        k.addIgnoreParams = function () {
            this.a.L = this.a.L.concat(y.call(arguments))
        };
        k.enableLazyClickTrace = function (a) {
            this.a.Ke = !a
        };
        k.enableHeatmap = function (a) {
            this.a.U = !0;
            this.a.Le = a;
            this.U && this.U.bind()
        };
        k.enableCodeless = function () {
            this.a.K = !0;
            this.K && (this.K.wb(), this.K.bind())
        };
        k.enableCrossDomain = function (a) {
            this.a.Jd = !a
        };
        k.enableLocalTraffic = function () {
            this.a.vf = !0
        };
        k.enableAnchor = function () {
        };
        k.keepAnchor = function (a) {
            this.a.zb = !a
        };
        k.disableAnchor = function () {
            this.a.zb = !1
        };
        k.enableRedirectServer = function (a) {
            this.Hb = a || this.a.domain
        };
        k.setErrorUrls = function (a) {
            f(a) || (a = y.call(arguments));
            e.nb = a || []
        };
        k.getSessionRefPage = function () {
            if (this.i) return this.i.ee()
        };
        k.enableCheckSum = function (a) {
            this.a.Fd = void 0 == a ? !0 : a
        };
        k.setAbServer = function (a) {
            this.a.Rb = a
        };
        k.enableAdditionalStorage = function () {
        };
        k.enableDurable = function (a) {
            this.a.ac = void 0 == a ? !0 : a
        };
        k.enableLocalized = function (a) {
            this.a.Ic = void 0 == a ? !0 : a
        };
        k.linkDomains = function () {
            function a(a, c) {
                if (-1 == d.pathname.indexOf("gridsum_crossdomain_helper")) for (var g, f = 0, h = a.length; f < h; f++) g = b.createElement("iframe"), g.src = "//" + a[f].domain + a[f].path + "#" + c, g.style.display = "none", b.body.appendChild(g);
                e.W("_gspc1", "1", 1600);
                e.W("_gspc2", "1")
            }

            try {
                if (!(-1 < d.hash.indexOf("gwdheatmap"))) {
                    this.enableCrossDomain();
                    var c, f = y.call(arguments), h = f.length, k = d.hostname, l = !(e.P("_gspc1") && e.P("_gspc2")),
                        m = [], n, p = !1;
                    for (c = 0; c < h; c++) {
                        var q = f[c].split("/")[0], r = f[c].substring(f[c].indexOf("/")), v = l && d.pathname != r;
                        if (q != k) {
                            var w = "www." == q.substr(0, 4) ? q.substr(4) : q;
                            -1 === k.indexOf(w, k.length - w.length + 1) && v && (p = !0, m.push({domain: q, path: r}))
                        }
                    }
                    p && (n = this.getWDCookieString(), b.body ? a(m, n) : e.Pb("document.body", function () {
                        a(m, n)
                    }))
                }
            } catch (N) {
                e.f(this.a.Lf, "P_CD", N)
            }
        };
        k.clientRedirect = function (a, b) {
            try {
                this.init();
                if (this.disabled) return !0;
                var c = a.href, g = this.i.m.get("_gscs"), f = g ? g.split("|")[0] : "null", h = "?destUrl=" +
                    B(c) + "&gssid=" + f;
                0 != b && (h += "&gsref=" + B(d.href));
                a.href = this.a.Yb + h
            } catch (D) {
                e.f(this.c, "FC_clientRedirect", D)
            }
            return !0
        };
        k.setClientRedirectUrl = function (a) {
            this.a.Yb = a
        };
        k.bindDomains = function (a, f, h) {
            function g(a, b) {
                for (var c = 0; c < b.length; c++) if (0 === a.indexOf(b[c])) return !0;
                return !1
            }

            function k() {
                try {
                    if (l.init(), !l.disabled) {
                        for (var c = e.mc(d.hostname), h = 0; h < a.length; h++) -1 < a[h].indexOf(c) && (a.splice(h, 1), h--);
                        for (var k = b.getElementsByTagName("a"), c = 0; c < k.length; c++) if (g(k[c].href, a)) {
                            var m = new H(k[c].href);
                            m.cb("_gscu_", l.i.m.get("_gscu"));
                            m.bb("_gscs_", l.i.m.get("_gscs"));
                            k[c].href = m.toString()
                        } else if (f) for (h = 0; h < f.length; h++) k[c].getAttribute(f[h]) && g(k[c].getAttribute(f[h]), a) && (m = new H(k[c].getAttribute(f[h])), m.cb("_gscu_", l.i.m.get("_gscu")), m.bb("_gscs_", l.i.m.get("_gscs")), k[c].setAttribute(f[h], m.toString()))
                    }
                } catch (M) {
                    e.f(l.c, "FC_bindDomains", M)
                }
            }

            var l = this;
            h ? c.setTimeout(k, h) : k()
        };
        k.enableSessionRefPage = function (a) {
            this.a.jf = void 0 == a ? !0 : a
        };
        k.trackExposure = function () {
            var a = this;
            try {
                if (a.init(), !a.disabled && b.querySelectorAll) {
                    for (var c = b.querySelectorAll("[gsexpkey]"), d = {}, f = 0; f < c.length; f++) {
                        (function () {
                            var b = c[f];
                            e.observe(c[f], "click", function () {
                                a.uf(b)
                            })
                        })();
                        var h = e.s(null, c[f], null, {gscampaign: ""}),
                            k = null != h ? h.getAttribute("gscampaign") : "",
                            h = e.s(null, c[f], null, {gsposition: ""}),
                            l = null != h ? h.getAttribute("gsposition") : "",
                            h = e.s(null, c[f], null, {gsexpkey: ""});
                        if (null != h) {
                            var m = h.getAttribute("gsexpkey");
                            null !== m && (void 0 === d[k] && (d[k] = {}), void 0 === d[k][l] && (d[k][l] = []), d[k][l].push(m))
                        }
                    }
                    for (var n in d) {
                        var p = a.getCommon("exp");
                        p.gscamp = n;
                        var h = [], q;
                        for (q in d[n]) h.push(q + ":" + d[n][q].join(","));
                        p.gslist = h.join("|");
                        a.sender.send(p)
                    }
                }
            } catch (T) {
                e.f(a.c, "trackExposure", T)
            }
        };
        k.trackSwiper = function (a) {
            var b = this;
            try {
                if (b.init(), !b.disabled) {
                    var d = a.params.onSlideChangeStart;
                    a.params.onSlideChangeStart = function (a) {
                        d && d(a);
                        try {
                            var f = b.getCommon("sc"), g = b.a.fd || c.innerHeight || (z ? z.clientHeight : null);
                            f.gsst = g * a.activeIndex;
                            f.gswh = g;
                            f.gsorurl = b.a.J;
                            b.sender.send(f)
                        } catch (D) {
                            e.f(b.c, "trackSwiper", D)
                        }
                    }
                }
            } catch (x) {
                e.f(b.c, "trackSwiper", x)
            }
        };
        k.mapCookie = function () {
            (new a.jd(this.a)).cc()
        };
        k.setUbcfgHash = function (a) {
            this.a.Mb = a;
            this.K && this.K.wb()
        };
        k.setAdditionalProfile = function (a) {
            this.a.Sb = e.sa(a) ? [a] : a
        };
        k.setAdConfig = function (a) {
            this.init();
            new G(a, this.a)
        };
        k.enableSPATracking = function (a) {
            this.a.Dc = 0 != a
        };
        k.setCoordinate = function (a) {
            a && (e.sa(a) && b.querySelector && (a = b.querySelector(a)), this.a.O = a)
        };
        return l
    }();
    a.j = {
        version: "3.7.0.14", wc: {}, plugins: [], Ya: {}, Da: void 0, register: function (b, c, d) {
            a.j.plugins.push({name: b, rf: c});
            a.j.addApis(d)
        }, addApis: function (a) {
            if (a) for (var b in a) l(a, b) && (W.prototype[b] = a[b])
        }, addHook: function (b, c) {
            var d = a.j.wc;
            b = w(b);
            d[b] = d[b] || [];
            d[b].push(c)
        }, execHook: function (b) {
            for (var c = [], d = 1; d < arguments.length; d++) c[d - 1] = arguments[d];
            if (d = a.j.wc[b]) for (var e = 0; e < d.length; e++) {
                var f = d[e];
                f.apply(f, c)
            }
        }, isTrackerExist: function (b) {
            return !!a.j.Ya[b]
        }, getTracker: function (b, c, d) {
            e.Ka();
            b = e.trim(b);
            return a.j.Ya[b] || (a.j.Ya[b] = new W(b, c, d))
        }, getHybridTracker: function (b, c) {
            e.Ka() && (c = b);
            return a.j.getTracker(c)
        }, loadCallback: function (a, b, c) {
            e.Pb("window." + (a || "_gsCallback"), function (a) {
                a()
            }, b, c)
        }, getServiceId: function () {
            var b = [], c;
            for (c in a.j.Ya) b.push(c);
            return b
        }
    };
    var S = {
        decode: e.decode,
        delCookie: e.lb,
        encode: e.encode,
        find: e.find,
        findArray: e.dc,
        getAd: e.fc,
        getCookie: e.P,
        getDocWidth: e.pb,
        getEl: e.T,
        getExpireDate: e.hc,
        getHashCode: e.qa,
        getInnerText: e.ha,
        getInnerUnvisibleText: e.ia,
        getLocalTime: e.Aa,
        getPointer: e.lc,
        getPos: e.o,
        getPrimaryDomain: e.mc,
        getRandomID: e.A,
        getRandomString: e.ra,
        getTimeZone: e.Ma,
        getUrlParam: e.R,
        indexOf: e.indexOf,
        isIE: e.Pa,
        isMobile: e.Bc,
        isPageMatch: e.yb,
        lower: e.lower,
        observe: e.observe,
        observeTouch: e.Ha,
        openApp: e.Re,
        report: e.f,
        resolveURL: e.ta,
        resolveUrl: e.ta,
        searchUp: e.s,
        serialize: e.D,
        setCookie: e.W,
        toDict: e.Lb,
        trim: e.trim,
        voidFunc: e.ed,
        waitFor: e.Pb
    }, F = function () {
        function a() {
        }

        a.prototype.push = function (a) {
            n(a)
        };
        return a
    }();
    try {
        if (-1 === A(w(d.hash), "#gwdheatmap&")) for (var P = 0; P < _gsq.length; P++) n(_gsq[P]);
        _gsq = new F
    } catch (K) {
    }
    c.GridsumWebDissector = a.j;
    c._gsUtility = S
})(Gridsum || (Gridsum = {}));
var _gsTracker = GridsumWebDissector.getTracker('GWD-002808');
_gsTracker.setServiceUrls("//www.webdissector.com/recv/gs.gif", "//recv-wd.gridsumdissector.com/gs.gif", "//yhxwsjjs.court.gov.cn/gs.gif");
if (_gsUtility.isPageMatch(["/", "/Index"], 'exactmatch', location.pathname)) {
    _gsTracker.enableHeatmap();
    _gsTracker.setPageVersion("ver20160316");
    _gsTracker.setOriginalUrl("http://wenshu.court.gov.cn/");
} else {
}
_gsTracker.track();