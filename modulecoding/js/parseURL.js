define(function () {


    search_lists_bdsearch_lists_bdsearch_lists_bdsearch_lists_b


    return {parseURL: ParseURL};
});
/*
define(function () {
    function ParseURL() {

    };

    ParseURL.prototype = {

        params: function (uri) {
            var ret = {},
                seg = uri.substring(uri.indexOf('?')+1,uri.length).split('&'),
                len = seg.length, i = 0, s;
            for (; i < len; i++) {
                if (!seg[i]) {
                    continue;
                }
                s = seg[i].split('=');
                ret[s[0]] = s[1];
            }
            return ret;
        }

    };

    return {parseURL: ParseURL};
});*/





