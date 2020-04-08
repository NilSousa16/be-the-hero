const generateUniqueId = require('../../src/utils/generateUniqueId');
/**
 * Exemplo de teste simples
 */
describe('Generate Unique ID', () => {
    it('should generate an unique ID', () => {
        const id = generateUniqueId();

        expect(id).toHaveLength(8);
    });
});