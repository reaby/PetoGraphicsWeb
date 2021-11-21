import { v4 as uuidv4 } from 'uuid';

export const BLANK = () => ({
    id: uuidv4(),
    name: 'Blank',
    type: 'Blank',
    visible: false,
    left: 0,
    top: 0,
    width: 0,
    height: 0,
    image: null,
    imageStretch: 'fit',
    children: []
});
