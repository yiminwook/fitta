class DarkModeLocalStorage {
  private data: boolean = false;
  private key: string;

  public constructor({ key }: { key: string }) {
    this.key = key;
    this.init();
  }

  /** os prefer color scheme 반환 */
  private getWindowColorScheme() {
    return window.matchMedia('(prefers-color-scheme: dark)').matches;
  }

  /** this.data를 localStorage에 저장 */
  private setItem() {
    localStorage.setItem(this.key, JSON.stringify(this.data));
  }

  /** window color scheme값을 우선하여 초기화 */
  public init() {
    const initData: boolean = this.getWindowColorScheme() || JSON.parse(localStorage.getItem(this.key) ?? 'false');
    this.setState(initData);
  }

  public setState(newData: boolean) {
    this.data = newData;
    document.documentElement.setAttribute('color-mode', this.data ? 'dark' : 'light');
    this.setItem();
  }

  public toggleDarkMode() {
    this.setState(!this.data);
  }

  public reset() {
    this.setState(this.getWindowColorScheme());
  }

  public get Data() {
    return this.data;
  }
}

export default DarkModeLocalStorage;

export const darkModeStorage = new DarkModeLocalStorage({
  key: 'darkMode',
});
