class DarkModeLocalStorage {
  private data: boolean = false;
  private key: string;

  public constructor({ key }: { key: string }) {
    this.key = key;
    this.init();
  }

  private getWindowColorScheme() {
    return window.matchMedia('(prefers-color-scheme: dark)').matches;
  }

  public init() {
    const initData: boolean =
      this.getWindowColorScheme() || JSON.parse(localStorage.getItem(this.key) as string) || false;
    this.data = initData;
    this.setItem();
  }

  public toggleDarkMode() {
    this.setState(!this.data);
  }

  public setState(newData: boolean) {
    this.data = newData;
    this.setItem();
  }

  private setItem() {
    localStorage.setItem(this.key, JSON.stringify(this.data));
  }

  public reset() {
    this.setState(window.matchMedia('(prefers-color-scheme: dark)').matches);
  }

  public get Data() {
    return this.data;
  }
}

export default DarkModeLocalStorage;

export const darkModeStorage = new DarkModeLocalStorage({
  key: 'darkMode',
});
