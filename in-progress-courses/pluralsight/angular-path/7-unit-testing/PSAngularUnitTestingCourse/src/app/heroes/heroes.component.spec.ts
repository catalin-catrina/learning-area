import { of } from 'rxjs';
import { HeroesComponent } from './heroes.component';

describe('HeroesComponent', () => {
  let component: HeroesComponent;
  let mockHeroService;
  let heroes;

  beforeEach(() => {
    heroes = [
      { id: 1, name: 'Leo', strength: 10 },
      { id: 2, name: 'Cata', strength: 5 },
      { id: 3, name: 'Anca', strength: 8 },
    ];

    mockHeroService = jasmine.createSpyObj([
      'getHeroes',
      'addHero',
      'deleteHero',
    ]);

    component = new HeroesComponent(mockHeroService);
  });

  describe('delete', () => {
    it('should remove the indicated hero from the heroes list', () => {
      mockHeroService.deleteHero.and.returnValue(of(true));
      component.heroes = heroes;
      let firstHero = component.heroes[0];

      component.delete(firstHero);

      expect(component.heroes.find((hero) => hero.name === 'Leo')).toBe(
        undefined
      );
    });

    it('should call deleteHero', () => {
      mockHeroService.deleteHero.and.returnValue(of(true));
      component.heroes = heroes;
      let firstHero = component.heroes[0];

      component.delete(firstHero);

      expect(mockHeroService.deleteHero).toHaveBeenCalledWith(firstHero);
    });
  });
});
