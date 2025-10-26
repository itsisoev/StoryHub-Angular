import {Injectable} from '@angular/core';
import {StoragePort} from './storage.port';

@Injectable({providedIn: 'root'})
export class LocalStorageAdapter implements StoragePort {
  private get storage(): Storage | null {
    try {
      return window?.localStorage ?? null;
    } catch {
      return null;
    }
  }

  get(key: string): string | null {
    return this.storage?.getItem(key) ?? null;
  }

  set(key: string, value: string): void {
    this.storage?.setItem(key, value);
  }

  remove(key: string): void {
    this.storage?.removeItem(key);
  }
}
