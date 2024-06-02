// @ts-nocheck

const ViewValues = {
  size: 1080,
  lineHeight: 24,
};

class View {
  constructor(props) {
    this.props = props;
    this.type = 'View';
    this.spatialGeometry = {};
    this.layout = {
      relativeIndex: 1,
    };
    this.renderQueue = [];
    this.previousRect = null;
  }

  appendChild(fn) {
    this.renderQueue.push(fn);
  }

  getAndUpdateCurrentLayout = () => {
    const currentRelativeIndex = this.layout.relativeIndex;
    this.layout = {
      relativeIndex: this.layout.relativeIndex + 1,
    };
    return {
      relativeIndex: currentRelativeIndex,
    };
  };

  resetLayout = () => {
    this.layout = {
      relativeIndex: 0,
    };
  };

  getLayoutDefinitions = () => {
    const resetLayout = this.resetLayout;
    return {
      style: {
        backgroundColor: 'white',
        borderColor: 'white',
        lineHeight: ViewValues.lineHeight,
        ...(this.props.style || {}),
      },
      spatialGeometry: this.spatialGeometry,
      resetLayout,
    };
  };

  children() {
    return this.renderQueue;
  }

  clear() {
    const { ctx} = fiberContext;
    const { style } = parentLayout;

    if (this.previousRect) {
      ctx.beginPath();
      const {x, y, width, height, cornerRadius} = this.previousRect;
      ctx.moveTo(x, y);
      ctx.lineTo(x + width - cornerRadius, y);
      ctx.quadraticCurveTo(x + width, y, x + width, y + cornerRadius);
      ctx.lineTo(x + width, y + height - cornerRadius);
      ctx.quadraticCurveTo(
        x + width,
        y + height,
        x + width - cornerRadius,
        y + height
      );
      ctx.lineTo(x + cornerRadius, y + height);
      ctx.quadraticCurveTo(x, y + height, x, y + height - cornerRadius);
      ctx.lineTo(x, y + cornerRadius);
      ctx.quadraticCurveTo(x, y, x + cornerRadius, y);
      ctx.strokeStyle = style.backgroundColor || 'transparent';
      ctx.fillStyle = style.backgroundColor || 'transparent';
      ctx.fill();
      ctx.stroke();
      ctx.closePath();
    }
  }

  render(fiberContext) {
    const { ctx, getSurfaceHeight, setSurfaceHeight } = fiberContext;
    const { style = {} } = this.props;

    const previousStroke = ctx.strokeStyle;
    const x = style.x || style.left || 0;
    let y = style.y || style.top || 0;
    const width = style.width || ViewValues.size;
    const height = style.height || ViewValues.size;

    const cornerRadius = style.borderRadius || 0;

    if (!style.position || style.position === 'relative') {
      const surfaceHeight = getSurfaceHeight();
      y = surfaceHeight;
      setSurfaceHeight(surfaceHeight + height);
    }

    ctx.globalCompositeOperation = 'destination-over';
    ctx.beginPath();

    ctx.moveTo(x, y);
    ctx.lineTo(x + width - cornerRadius, y);
    ctx.quadraticCurveTo(x + width, y, x + width, y + cornerRadius);
    ctx.lineTo(x + width, y + height - cornerRadius);
    ctx.quadraticCurveTo(
      x + width,
      y + height,
      x + width - cornerRadius,
      y + height
    );
    ctx.lineTo(x + cornerRadius, y + height);
    ctx.quadraticCurveTo(x, y + height, x, y + height - cornerRadius);
    ctx.lineTo(x, y + cornerRadius);
    ctx.quadraticCurveTo(x, y, x + cornerRadius, y);

    this.previousRect = {x, y, width, height, cornerRadius};
    ctx.strokeStyle = style.borderColor || 'transparent';
    ctx.fillStyle = style.backgroundColor || 'transparent';
    ctx.fill();
    ctx.stroke();
    ctx.closePath();

    ctx.globalCompositeOperation = 'source-over';
    ctx.strokeStyle = previousStroke;

    this.spatialGeometry = {x, y};

    const callRenderFunctions = (renderFunction) => {
      renderFunction.render
        ? renderFunction.render(fiberContext, {
            ...this.getLayoutDefinitions(),
            ...renderFunction.layout,
          })
        : null;
    };

    this.renderQueue.forEach(callRenderFunctions);
  }
}

export default View;
