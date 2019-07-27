import {ReactInstance} from 'react-360-web';

function init(bundle, parent, options = {}) {
  const r360 = new ReactInstance(bundle, parent, {
    // Add custom options here
    fullScreen: true,
    ...options,
  });

  // Render your app content to the default cylinder surface
  r360.renderToSurface(
    r360.createRoot('react360', { /* initial props */ }),
    r360.getDefaultSurface()
  );

  // Change image here
  r360.compositor.setBackground(r360.getAssetURL('PANO_20190315_145504_2.jpg'));
}

window.React360 = {init};
