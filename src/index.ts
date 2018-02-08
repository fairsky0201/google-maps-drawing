import Tool from './tool';
import Circle from './tools/circle';
import Polygon from './tools/polygon';

export interface ManagerOptions {
  map?: any;
  data?: google.maps.Data;
}

export enum ToolId {
  Circle = 'circle',
  Polygon = 'polygon'
}

export default class DrawingManager {
  map: any;
  data: google.maps.Data;
  tool?: Tool;

  constructor(options: ManagerOptions = {}) {
    this.map = options.map;
    this.data = options.data || new google.maps.Data();

    this.data.setMap(this.map);
  }

  changeTool(toolId: ToolId) {
    this.tool = this.createTool(toolId);
    this.data.setDrawingMode(null);
    this.tool.activate();
  }

  createTool(toolId: ToolId): Tool {
    switch (toolId) {
      case ToolId.Circle: {
        return new Circle({
          map: this.map,
          data: this.data
        });
      }

      case ToolId.Polygon: {
        return new Polygon({
          map: this.map,
          data: this.data
        });
      }
    }
  }
}
