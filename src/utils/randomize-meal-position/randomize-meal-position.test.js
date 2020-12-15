import randomizeMealPosition from './index';

const originalGlobalMath = global.Math;
const arenaConfigMock = {
  width: 8,
  height: 8,
};

beforeEach(() => {
  global.Math = {
    random: jest.fn(() => 1),
    floor: originalGlobalMath.floor,
  };

  jest.clearAllMocks();
});

afterEach(() => {
  global.Math = originalGlobalMath;
});

describe('when executed', () => {
  it('should trigger Math.random twice for x & y', () => {
    randomizeMealPosition(arenaConfigMock);
    expect(Math.random).toHaveBeenCalledTimes(2);
  });

  it('should return meal position', () => {
    expect(randomizeMealPosition(arenaConfigMock)).toEqual({
      x: expect.any(Number),
      y: expect.any(Number),
    });
  });

  it('should not exceed arena', () => {
    const result = randomizeMealPosition(arenaConfigMock);

    expect(result.x).toBeLessThan(arenaConfigMock.width);
    expect(result.y).toBeLessThan(arenaConfigMock.height);
  });
});
