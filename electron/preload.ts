
import { contextBridge, ipcRenderer } from 'electron';
import { type PortInfo} from '../types/PortInfo';

contextBridge.exposeInMainWorld('api',{
  listSerialPorts: (ports: PortInfo[]) => ipcRenderer.invoke('listSerialPorts')
});