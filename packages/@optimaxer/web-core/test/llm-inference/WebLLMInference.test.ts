/**
 * Author: Srilal S. Siriwardhane
 * Email: SrilalS@99x.io
**/

import { expect, test } from 'vitest';
import { DetectEnv } from '../../src/utils/DetectEnv';

test.skipIf(DetectEnv.isNode)("Not_Implemented_Yes", async () => {
    
});