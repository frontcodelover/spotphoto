import { calcul } from '../components/calcul'

describe('Le calsul retournera 15', () => {
    test('Doit retourner 15', () => {
        expect(calcul(5, 10)).toBe(15)
    })
    } )