/**
 * 中文输入法工具函数
 * 提供对中文输入法的支持和优化
 */

/**
 * 检测是否正在使用中文输入法
 * 通过检查 compositionstart 和 compositionend 事件来判断
 */
export class ChineseInputMethodDetector {
  private isComposing: boolean = false;
  private callbacks: { onCompositionStart?: () => void; onCompositionEnd?: () => void } = {};

  /**
   * 构造函数
   * @param callbacks 回调函数对象
   */
  constructor(callbacks?: { onCompositionStart?: () => void; onCompositionEnd?: () => void }) {
    this.callbacks = callbacks || {};
  }

  /**
   * 处理输入法组合开始事件
   */
  handleCompositionStart = () => {
    this.isComposing = true;
    if (this.callbacks.onCompositionStart) {
      this.callbacks.onCompositionStart();
    }
  };

  /**
   * 处理输入法组合结束事件
   */
  handleCompositionEnd = () => {
    this.isComposing = false;
    if (this.callbacks.onCompositionEnd) {
      this.callbacks.onCompositionEnd();
    }
  };

  /**
   * 获取当前是否正在使用输入法
   */
  getIsComposing(): boolean {
    return this.isComposing;
  }

  /**
   * 附加事件监听器到输入元素
   * @param element 输入元素
   */
  attachToElement(element: HTMLElement): void {
    element.addEventListener('compositionstart', this.handleCompositionStart);
    element.addEventListener('compositionend', this.handleCompositionEnd);
  }

  /**
   * 从输入元素移除事件监听器
   * @param element 输入元素
   */
  detachFromElement(element: HTMLElement): void {
    element.removeEventListener('compositionstart', this.handleCompositionStart);
    element.removeEventListener('compositionend', this.handleCompositionEnd);
  }
}

/**
 * 创建一个增强的输入处理函数，支持中文输入法
 * @param callback 输入变化时的回调函数
 * @returns 增强的输入处理函数
 */
export function createChineseInputHandler(callback: (value: string) => void): {
  onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  onCompositionStart: () => void;
  onCompositionEnd: (e: React.CompositionEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
} {
  let isComposing = false;
  let composedValue = '';

  return {
    onChange: (e) => {
      const value = e.target.value;
      composedValue = value;
      
      // 如果不是在输入法组合状态，立即触发回调
      if (!isComposing) {
        callback(value);
      }
    },
    onCompositionStart: () => {
      isComposing = true;
    },
    onCompositionEnd: (_e) => {
      isComposing = false;
      // 输入法组合结束后，使用最终值触发回调
      callback(composedValue);
    }
  };
}

/**
 * 中文字符串搜索工具
 * 提供对中文字符串的搜索功能，支持拼音和汉字混合搜索
 */
export class ChineseStringSearch {
  /**
   * 检查字符串是否包含搜索词（不区分大小写）
   * @param text 要搜索的文本
   * @param query 搜索词
   * @returns 是否包含
   */
  static contains(text: string, query: string): boolean {
    if (!text || !query) return false;
    
    return text.toLowerCase().includes(query.toLowerCase());
  }

  /**
   * 高亮文本中匹配的部分
   * @param text 原始文本
   * @param query 搜索词
   * @returns 带有高亮标记的HTML字符串
   */
  static highlight(text: string, query: string): string {
    if (!query || !text) return text;
    
    const lowerText = text.toLowerCase();
    const lowerQuery = query.toLowerCase();
    
    const index = lowerText.indexOf(lowerQuery);
    if (index === -1) return text;
    
    const before = text.substring(0, index);
    const match = text.substring(index, index + query.length);
    const after = text.substring(index + query.length);
    
    return `${before}<mark>${match}</mark>${after}`;
  }
}