//SuT
import { sortObjectByKey } from './utils';

describe('sortObjectByKey', () => {
  it('returns a function', () => {
    expect(sortObjectByKey()).toEqual(expect.any(Function));
  });

  describe('orders numbers correctly', () => {
    const collection = [{ foo: 3 }, { foo: 2 }, { foo: 4 }, { foo: 1 }];

    it('in asc order by default', () => {
      const predicate = sortObjectByKey('foo');
      const expectedResult = [{ foo: 1 }, { foo: 2 }, { foo: 3 }, { foo: 4 }];

      expect(collection.sort(predicate)).toEqual(expectedResult);
    });

    it('in desc order', () => {
      const predicate = sortObjectByKey('foo', { order: 'desc' });
      const expectedResult = [{ foo: 4 }, { foo: 3 }, { foo: 2 }, { foo: 1 }];

      expect(collection.sort(predicate)).toEqual(expectedResult);
    });
  });

  describe('orders strings correctly', () => {
    const collection = [{ label: 'foo' }, { label: 'bar' }, { label: 'baz' }, { label: 'qux' }];

    it('in asc order by default', () => {
      const predicate = sortObjectByKey('label', { type: 'string' });
      const expectedResult = [{ label: 'qux' }, { label: 'foo' }, { label: 'baz' }, { label: 'bar' }];

      expect(collection.sort(predicate)).toEqual(expectedResult);
    });

    it('in desc order', () => {
      const predicate = sortObjectByKey('label', { type: 'string', order: 'desc' });
      const expectedResult = [{ label: 'bar' }, { label: 'baz' }, { label: 'foo' }, { label: 'qux' }];

      expect(collection.sort(predicate)).toEqual(expectedResult);
    });

    it('when value is the same', () => {
      const collectionSame = [{ label: 'foo', id: 1 }, { label: 'foo', id: 3 }, { label: 'foo', id: 2 }];
      const predicate = sortObjectByKey('label', { type: 'string' });

      expect(collectionSame.sort(predicate)).toEqual(collectionSame);
    });
  });

  it('does not order unknown type', () => {
    const collectionSame = [{ label: 'foo' }, { label: 'bar' }, { label: 'baz' }];
    const predicate = sortObjectByKey('label', { type: null });

    expect(collectionSame.sort(predicate)).toEqual(collectionSame);
  })
});


