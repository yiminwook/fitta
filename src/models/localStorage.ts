import { SEARCH_HISTORY_MAX_LENGTH } from '@/consts';

type LocalStorageDataType = string[];

class LocalStorage {
  private data: LocalStorageDataType = [];
  private key: string;
  private maxLenth: number;

  public constructor({ key, maxLength }: { key: string; maxLength: number }) {
    this.key = key;
    this.maxLenth = maxLength;
    this.init();
  }

  public init() {
    const initData = JSON.parse(localStorage.getItem(this.key) ?? '[]') as string[];
    this.data = initData;
  }

  public setState(newData: LocalStorageDataType) {
    const slicedNewData = newData.slice(0, this.maxLenth);
    this.data = slicedNewData;
    localStorage.setItem(this.key, JSON.stringify(slicedNewData));
  }

  public addOneData(data: string) {
    const newData = [data, ...this.data.slice().filter((string) => string !== data)];
    this.setState(newData);
  }

  public deleteOneDataByIndex(index: number) {
    const newData = this.data.filter((d, i) => i !== index);
    this.setState(newData);
  }

  public reset() {
    this.setState([]);
  }

  public get Data(): LocalStorageDataType {
    return this.data;
  }
}

export default LocalStorage;

export const searchHistoryLocalStorage = new LocalStorage({
  key: 'searchHistory',
  maxLength: SEARCH_HISTORY_MAX_LENGTH,
});
