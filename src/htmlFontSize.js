// 定义最大的 fontSize
const MAX_FONT_SIZE = 210
const MIN_FONT_SIZE = 72
// 1920窗口下  1rem =96px
export function computedFontSize(html) {
    // 获取根元素 fontSize 标准，

    let fontSize = window.innerWidth / 19.2
    if(MIN_FONT_SIZE>fontSize){
        fontSize=MIN_FONT_SIZE
    }
  
    html.style.fontSize = fontSize + 'px'

    return fontSize
}
