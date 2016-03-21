import {expect} from '../../settings';
import {EventService} from '../../../source/browser/ts/services/event.service';

describe('Сервис сообщений между компонентами внутри браузера:', () => {
    let _service: EventService = new EventService();
    
    before(() => {
        _service = new EventService();
    });
    
    describe('Источник отправляет данные в сервис сообщений с заданным ключом -> подписчик по данному ключу получает данные через callback', () => {
        
        it(`Отправлем объект {a:4, b:'test'} с ключом 'test', подписчик подписывается в сервисе на сообщения с ключом 'test' и получает объект {a:4, b:'test'}`, (done) => {
            
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