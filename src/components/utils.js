function getViewport() {

    let viewPortWidth;
    let viewPortHeight;
   
    // the more standards compliant browsers 
    // (mozilla/netscape/opera/IE7) use window.innerWidth and window.innerHeight
    if (typeof window.innerWidth != 'undefined') {
      viewPortWidth = window.innerWidth,
      viewPortHeight = window.innerHeight
    }
   
   // IE6 in standards compliant mode 
   // (i.e. with a valid doctype as the first line in the document)
    else if (typeof document.documentElement != 'undefined'
    && typeof document.documentElement.clientWidth !=
    'undefined' && document.documentElement.clientWidth != 0) {
       viewPortWidth = document.documentElement.clientWidth,
       viewPortHeight = document.documentElement.clientHeight
    }
   
    // older versions of IE
    else {
      viewPortWidth = document.getElementsByTagName('body')[0].clientWidth,
      viewPortHeight = document.getElementsByTagName('body')[0].clientHeight
    }
    return [viewPortWidth, viewPortHeight];
}

function initializeHiPPICanvasProps (can, w, h, ratio) {
    can.width = w * ratio;
    can.height = h * ratio;
    can.style.width = w + 'px';
    can.style.height = h + 'px';
    let context = can.getContext('2d');
    context.setTransform(ratio, 0, 0, ratio, 0, 0);
    return context;
}

function getPixelRate() {
    let ctx = document.createElement("canvas").getContext("2d"),
    dpr = window.devicePixelRatio || 1,
    bsr = ctx.webkitBackingStorePixelRatio ||
            ctx.mozBackingStorePixelRatio ||
            ctx.msBackingStorePixelRatio ||
            ctx.oBackingStorePixelRatio ||
            ctx.backingStorePixelRatio || 1;
    return dpr / bsr;
}

export { getViewport, initializeHiPPICanvasProps, getPixelRate };