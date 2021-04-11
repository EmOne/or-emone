import { TestBed } from '@angular/core/testing';

import { EventMqttService } from './event.mqtt.service';

describe('Event.MqttService', () => {
  let service: EventMqttService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(EventMqttService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
