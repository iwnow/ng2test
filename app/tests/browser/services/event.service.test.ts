import {expect} from '../../settings';
import {EventService} from '../../../source/browser/ts/services/all';

describe('Browser event service test:', () => {
    let _service: EventService = new EventService();
    
    before(() => {
        _service = new EventService();
    });
    
    describe('Data push to event service by any object -> subscriber handle the data by key', () => {
        
        it(`push obj {a:4, b:'test'} with key 'test', subscriber subs the event with key 'test' and get obj {a:4, b:'test'}`, (done) => {
            
            let key = 'test';
            let getData;
            let pushData = {
                a:4, 
                b:'test'
            };
            
            _service.subscribe(key, (data) => {
                getData = data;
                
                expect(getData.a).to.equals(pushData.a);
                expect(getData.b).to.equals(pushData.b);
                
                done();  
            });
            
            _service.emit({
                key: key,
                data: pushData
            });            
              
        });
        
    });
 
});