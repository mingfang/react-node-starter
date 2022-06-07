// copied from https://github.com/MichaelDurfey/mf-dynamic-remote-component

export default function RemoteComponent(remoteModule) {
  window.remoteMFStore = window.remoteMFStore || {};
  const id = getRemoteModuleId(remoteModule);
  const existingModule = window.remoteMFStore[id];
  if (existingModule) {
    return existingModule;
  }
  window.remoteMFStore[id] = loadingPromise(remoteModule);
  return window.remoteMFStore[id];
}

function getRemoteModuleId({path, module, scope}) {
  return [path, module, scope].join('');
}

function getDynamicScript(remoteModule) {
  const id = getRemoteModuleId(remoteModule);

  const existingElement = document.getElementById(id);

  if (existingElement) {
    if (window[remoteModule.scope]) {
      return Promise.resolve(true);
    }
    return new Promise((resolve) => {
      existingElement.onload = (e) => {
        resolve(true);
      };
    });
  }

  const element = document.createElement('script');

  element.src = remoteModule.path;
  element.type = 'text/javascript';
  element.async = true;
  element.id = id;

  document.head.appendChild(element);

  return new Promise((resolve, reject) => {
    element.onload = () => {
      resolve(true);
    };
    element.onerror = () => {
      // eslint-disable-next-line no-console
      console.error(`Dynamic Script Error: ${remoteModule.path}`);
    };
  });
}

async function loadComponent(path, scope, module) {
  try {
    // Initializes the shared scope.
    // Fills known provided modules from this build and all remotes
    await __webpack_init_sharing__('default');
    const container = window[scope]; // or get the container somewhere else
    // Initialize the container, it may provide shared modules
    // eslint-disable-next-line camelcase
    await container.init(__webpack_share_scopes__.default);
    const factory = await window[scope].get(module);
    const Module = factory();
    return Module;
  } catch (e) {
    throw new Error(`Error loading remote module. 
      Please check the url: ${path}, scope: ${scope} and module: ${module} 
      -----------------------------------------------
      ${e}`);
  }
}

const loadingPromise = (remoteModule) =>
  new Promise(async (resolve, reject) => {
    try {
      await getDynamicScript(remoteModule);
      const _module = await loadComponent(
        remoteModule.path,
        remoteModule.scope,
        remoteModule.module,
      );

      resolve(_module);
    } catch (e) {
      console.log(`mf-dynamic-remote-component: error getting remote ${e}`);
      reject(e);
    }
  });

