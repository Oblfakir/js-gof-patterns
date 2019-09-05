import * as behavioral from './behavioral';
import * as creational from './creational';
import * as structural from './structural';
import { logger } from './logger';

document.addEventListener("DOMContentLoaded", function(event) {
    logger.add('message 1');
    logger.add('message 2');
});
