function updateProxyGroup(config, groupName, dialerProxyName, targetGroupName) {
  const group = config["proxy-groups"].find(
    (group) => group.name === groupName
  );

  if (group) {
    group.proxies.forEach((proxyName) => {
      const proxy = (config.proxies || []).find(
        (p) => p.name === proxyName
      );
      if (proxy) {
        proxy["dialer-proxy"] = dialerProxyName;
      }
    });

    if (group.proxies.length > 0) {
      const targetGroupIndex = config["proxy-groups"].findIndex(
        (group) => group.name === targetGroupName
      );
      if (targetGroupIndex !== -1) {
        config["proxy-groups"][targetGroupIndex] = {
          name: targetGroupName,
          type: "select",
          proxies: [groupName],
        };
      }
    }
  }
}

function main(config, profileName) {
  // 传入配置config，需要添加dialer节点的组，指定dialer-proxy组，需要替换的relay组
  // 后面的配置会替代前面的配置
  updateProxyGroup(config, "🏠 家宽落地", "🏠 家宽入口", "🏠 家宽");

  return config;
}