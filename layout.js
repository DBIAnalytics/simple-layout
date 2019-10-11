var defaultHeaderHeightVh = 10;

var defaultFooterHeightVh = 10;
var expandedFooterHeightVh = 50;

var desktopSidebarWidthWh = 30;
var mobileSidebarWidthWh = 50;

var _headerVisible = true;
var _footerVisible = true;
var _footerExpanded = false;
var _sidebarVisible = false;
var _usingInnerFooter = false;

function hideHeader() {
    _headerVisible = false;

    var header = document.getElementsByTagName("header").item(0);
    header.style.display = "none";

    _sizeArticle();
}

function showHeader() {
    _headerVisible = true;

    var header = document.getElementsByTagName("header").item(0);
    header.style.display = "flex";
    header.style.height = defaultHeaderHeightVh + "vh";

    _sizeArticle();
}

function hideFooter() {
    _footerVisible = false;

    var inner = document.getElementById("innerFooter");
    inner.style.display = "none";

    var outer = document.getElementById("outerFooter");
    outer.style.display = "none";

    _sizeArticle();
}

function showFooter() {
    _footerVisible = true;

    var footer = null;
    if (!_usingInnerFooter) {
        footer = document.getElementById("outerFooter");
    } else {
        footer = document.getElementById("innerFooter");
    }
    footer.style.display = "block";
    var newFooterHeight = _footerExpanded ? expandedFooterHeightVh : defaultFooterHeightVh;
    footer.style.height = newFooterHeight + "vh";
    var footerHeader = footer.getElementsByClassName("footerHeader").item(0);
    footerHeader.style.display = "block";

    _sizeArticle();
}

function collapseFooter() {
    _footerExpanded = false;

    var footer = document.getElementById("outerFooter");
    footer.style.height = defaultFooterHeightVh + "vh";

    var footerBody = document.getElementsByClassName("footerBody").item(0);
    footerBody.style.display = "none";

    _sizeArticle();
}

function expandFooter() {
    if (_sidebarVisible) {
        throw new Error("The footer cannot be expanded when the sidebar is visible!");
    }
    if (_usingInnerFooter) {
        throw new Error("Only the outer footer can expanded!");
    }

    _footerExpanded = true;


    var outerFooter = document.getElementById("outerFooter");
    outerFooter.style.height = expandedFooterHeightVh + "vh";

    var footerBody = outerFooter.getElementsByClassName("footerBody").item(0);
    footerBody.style.display = "block";

    if (!_usingInnerFooter) {
        var outer = document.getElementById("outerFooter");
        var footerHeader = outer.getElementsByClassName("footerHeader").item(0);
        footerHeader.style.display = "block";
    }

    _sizeArticle();
}

function hideSidebar() {
    _sidebarVisible = false;

    var sidebar = document.getElementsByTagName("aside").item(0);
    sidebar.style.display = "none";

    var article = document.getElementsByTagName("article").item(0);
    article.style.marginLeft = "0";

    _useOuterFooter();
}

function showSidebar() {
    if (_footerExpanded) {
        throw new Error("The sidebar cannot be used when the footer is expanded!");
    }

    _sidebarVisible = true;

    var sidebar = document.getElementsByTagName("aside").item(0);
    sidebar.style.display = "block";

    if (_isMobile()) {
        sidebar.style.flex = "0 0 " + mobileSidebarWidthWh + "vw";

        var article = document.getElementsByTagName("article").item(0);
        article.style.marginLeft = "-" + desktopSidebarWidthWh + "vw";
    } else {
        sidebar.style.flex = "0 0 " + desktopSidebarWidthWh + "vw";
    }
    _useInnerFooter();
}

function _isMobile() {
    return window.innerWidth < 756;
}

function _useInnerFooter() {
    _usingInnerFooter = true;

    if (_footerVisible) {
        var inner = document.getElementById("innerFooter");
        inner.style.display = "block";
        inner.style.marginLeft = "-1em";
        inner.style.marginTop = "1em";
        inner.style.width = "calc(100% + 2em)";

        var footerHeader = inner.getElementsByClassName("footerHeader").item(0);
        footerHeader.style.display = "block";
        footerHeader.style.height = defaultFooterHeightVh + "vh";
    }

    var outer = document.getElementById("outerFooter");
    outer.style.display = "none";

    _sizeArticle();
}

function _useOuterFooter() {
    _usingInnerFooter = false;

    var inner = document.getElementById("innerFooter");
    inner.style.display = "none";

    if (_footerVisible) {
        var outer = document.getElementById("outerFooter");
        outer.style.display = "block";

        var footerHeader = outer.getElementsByClassName("footerHeader").item(0);
        footerHeader.style.display = "block";
        footerHeader.style.height = defaultFooterHeightVh + "vh";
    }

    _sizeArticle();
}

function _sizeArticle() {
    var newArticleMaxHeight = 100;
    if (_headerVisible) {
        newArticleMaxHeight -= defaultHeaderHeightVh;
    }
    if (_footerVisible && !_usingInnerFooter) {
        newArticleMaxHeight -= (_footerExpanded ? expandedFooterHeightVh : defaultFooterHeightVh);
    }

    var article = document.getElementsByTagName("article").item(0);
    article.style.maxHeight = newArticleMaxHeight + "vh";
}

function docReady(fn) {
    // see if DOM is already available
    if (document.readyState === "complete" || document.readyState === "interactive") {
        // call on next available tick
        setTimeout(fn, 1);
    } else {
        document.addEventListener("DOMContentLoaded", fn);
    }
}

document.onkeydown = function (ev) {
    console.log(ev);

    if (ev.key === "ArrowUp") {
        if (!_footerVisible) {
            showFooter();
        } else {
            expandFooter();
        }
    } else if (ev.key === "ArrowDown") {
        if (_footerExpanded) {
            collapseFooter();
        } else if (_footerVisible) {
            hideFooter();
        }
    } else if (ev.key === "ArrowLeft") {
        showSidebar();
    } else if (ev.key === "ArrowRight") {
        hideSidebar();
    }
};

docReady(function () {
    hideHeader();
    hideFooter();
    showHeader();
    showSidebar();
    showFooter();
    hideSidebar();
    expandFooter();
    collapseFooter();
    hideFooter();
    expandFooter();
    showFooter();
    hideFooter();
    collapseFooter();
    showFooter();
    showSidebar();
});

