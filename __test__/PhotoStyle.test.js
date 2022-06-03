import { photoStyle } from '../components/profil/PhotoStyle';

describe('Doit retourner value et label', () => {
test('Should return Architecture', () => {
    const item = photoStyle.find(item => item.value === 'Architecture');
    expect(item.value).toBe('Architecture');
    expect(item.label).toBe('Architecture');
})
} )
