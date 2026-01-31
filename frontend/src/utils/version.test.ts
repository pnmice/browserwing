import { describe, it, expect, beforeEach, vi } from 'vitest';
import {
  CURRENT_VERSION,
  compareVersions,
  hasNewVersion,
  fetchLatestVersion,
  getDismissedVersions,
  dismissVersion,
  isVersionDismissed,
} from './version';

describe('version utilities', () => {
  describe('CURRENT_VERSION', () => {
    it('should be defined', () => {
      expect(CURRENT_VERSION).toBeDefined();
      expect(typeof CURRENT_VERSION).toBe('string');
    });

    it('should follow semver format', () => {
      expect(CURRENT_VERSION).toMatch(/^\d+\.\d+\.\d+$/);
    });
  });

  describe('compareVersions', () => {
    it('should return 0 for equal versions', () => {
      expect(compareVersions('1.0.0', '1.0.0')).toBe(0);
      expect(compareVersions('2.1.3', '2.1.3')).toBe(0);
    });

    it('should return 1 when first version is greater', () => {
      expect(compareVersions('2.0.0', '1.0.0')).toBe(1);
      expect(compareVersions('1.1.0', '1.0.0')).toBe(1);
      expect(compareVersions('1.0.1', '1.0.0')).toBe(1);
    });

    it('should return -1 when first version is smaller', () => {
      expect(compareVersions('1.0.0', '2.0.0')).toBe(-1);
      expect(compareVersions('1.0.0', '1.1.0')).toBe(-1);
      expect(compareVersions('1.0.0', '1.0.1')).toBe(-1);
    });

    it('should handle versions with different lengths', () => {
      expect(compareVersions('1.0', '1.0.0')).toBe(0);
      expect(compareVersions('1.0.0', '1.0')).toBe(0);
      expect(compareVersions('1.0', '1.0.1')).toBe(-1);
    });
  });

  describe('hasNewVersion', () => {
    it('should return true when latest version is greater', () => {
      expect(hasNewVersion('1.0.0', '2.0.0')).toBe(true);
      expect(hasNewVersion('1.0.0', '1.1.0')).toBe(true);
    });

    it('should return false when versions are equal', () => {
      expect(hasNewVersion('1.0.0', '1.0.0')).toBe(false);
    });

    it('should return false when current version is greater', () => {
      expect(hasNewVersion('2.0.0', '1.0.0')).toBe(false);
    });
  });

  describe('fetchLatestVersion', () => {
    beforeEach(() => {
      vi.restoreAllMocks();
    });

    it('should fetch and return version info on success', async () => {
      const mockVersionInfo = {
        version: '2.0.0',
        releaseDate: '2024-01-01',
        features: ['feature1'],
        downloadUrl: 'https://example.com/download',
      };

      global.fetch = vi.fn().mockResolvedValue({
        ok: true,
        json: () => Promise.resolve(mockVersionInfo),
      });

      const result = await fetchLatestVersion();
      expect(result).toEqual(mockVersionInfo);
    });

    it('should return null on fetch failure', async () => {
      global.fetch = vi.fn().mockResolvedValue({
        ok: false,
      });

      const consoleSpy = vi.spyOn(console, 'error').mockImplementation(() => {});
      const result = await fetchLatestVersion();

      expect(result).toBeNull();
      consoleSpy.mockRestore();
    });

    it('should return null on network error', async () => {
      global.fetch = vi.fn().mockRejectedValue(new Error('Network error'));

      const consoleSpy = vi.spyOn(console, 'error').mockImplementation(() => {});
      const result = await fetchLatestVersion();

      expect(result).toBeNull();
      consoleSpy.mockRestore();
    });
  });

  describe('localStorage version dismissal', () => {
    beforeEach(() => {
      localStorage.clear();
    });

    describe('getDismissedVersions', () => {
      it('should return empty array when nothing stored', () => {
        expect(getDismissedVersions()).toEqual([]);
      });

      it('should return stored versions', () => {
        localStorage.setItem(
          'browserwing_dismissed_update_versions',
          JSON.stringify(['1.0.0', '1.1.0'])
        );
        expect(getDismissedVersions()).toEqual(['1.0.0', '1.1.0']);
      });

      it('should return empty array on parse error', () => {
        localStorage.setItem('browserwing_dismissed_update_versions', 'invalid-json');
        expect(getDismissedVersions()).toEqual([]);
      });
    });

    describe('dismissVersion', () => {
      it('should add version to dismissed list', () => {
        dismissVersion('1.0.0');
        expect(getDismissedVersions()).toContain('1.0.0');
      });

      it('should not duplicate versions', () => {
        dismissVersion('1.0.0');
        dismissVersion('1.0.0');
        const dismissed = getDismissedVersions();
        expect(dismissed.filter((v) => v === '1.0.0')).toHaveLength(1);
      });
    });

    describe('isVersionDismissed', () => {
      it('should return true for dismissed version', () => {
        dismissVersion('1.0.0');
        expect(isVersionDismissed('1.0.0')).toBe(true);
      });

      it('should return false for non-dismissed version', () => {
        expect(isVersionDismissed('2.0.0')).toBe(false);
      });
    });
  });
});
