"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _default = {
  vxe: {
    error: {
      groupFixed: '如果使用分组表头，固定列必须在左右两侧',
      cellEditRender: '渲染器 "cell-render" 和 "edit-render" 不能同时使用',
      treeFixedExpand: '树结构的固定列与展开行有冲突',
      treeLineExpand: '树结构的节点线与展开行有冲突',
      treeLineReqProp: '启用树节点线需要设置 "{{0}}"',
      scrollOriginal: '虚拟滚动启用后只能导出源数据，请将设置 "original=true"',
      scrollXNotGroup: '横向虚拟滚动不支持分组表头',
      scrollYReqProp: '纵向虚拟滚动需要设置 "{{0}}"',
      unableInsert: '无法插入到指定位置',
      useErr: '安装 "{{0}}" 模块时发生错误，顺序不正确',
      barUnableLink: '工具栏无法关联表格',
      toolbarId: '工具栏需要设置唯一 "id"',
      expandContent: '展开行的插槽应该是 "content"，请检查是否正确',
      reqModule: '缺少 "{{0}}" 模块',
      emptyProp: '参数 "{{0}}" 不允许为空',
      errProp: '参数 "{{0}}" 类型错误',
      notFunc: '"{{0}}" 方法不存在',
      noTree: '树结构不支持 "{{0}}"',
      delFunc: '方法 "{{0}}" 已废弃，请使用 "{{1}}"',
      delProp: '参数 "{{0}}" 已废弃，请使用 "{{1}}"',
      delEvent: '事件 "{{0}}" 已废弃，请使用 "{{1}}"',
      notType: '不支持的文件类型 "{{0}}"',
      notExp: '该浏览器不支持导入/导出功能',
      impFields: '导入失败，请检查字段名和数据格式是否正确',
      treeNotImp: '树表格不支持导入'
    },
    table: {
      emptyText: '暂无数据',
      allTitle: '全选/取消',
      seqTitle: '#',
      confirmFilter: '筛选',
      resetFilter: '重置',
      allFilter: '全部',
      sortAsc: '升序：最低到最高',
      sortDesc: '降序：最高到最低',
      filter: '对所选的列启用筛选',
      impSuccess: '导入成功',
      expSuccess: '导出成功'
    },
    grid: {
      selectOneRecord: '请至少选择一条记录！',
      deleteSelectRecord: '您确定要删除所选记录吗？',
      removeSelectRecord: '您确定要移除所选记录吗？',
      dataUnchanged: '数据未改动！ ',
      saveSuccess: '保存成功'
    },
    pager: {
      goto: '前往',
      pagesize: '条/页',
      total: '共 {{total}} 条记录',
      pageClassifier: '页',
      prevPage: '上一页',
      nextPage: '下一页',
      prevJump: '向上跳页',
      nextJump: '向下跳页'
    },
    alert: {
      title: '消息提示'
    },
    button: {
      confirm: '确认',
      cancel: '取消'
    },
    types: {
      csv: 'CSV (逗号分隔)(*.csv)',
      html: '网页(*.html)',
      xml: 'XML 数据(*.xml)',
      txt: '文本文件(制表符分隔)(*.txt)',
      xlsx: 'Excel 工作簿(*.xlsx)',
      pdf: 'PDF (*.pdf)'
    },
    modal: {
      zoomIn: '最大化',
      zoomOut: '向下还原',
      close: '关闭'
    },
    toolbar: {
      import: '导入数据',
      export: '导出数据',
      refresh: '刷新',
      zoomIn: '最大化',
      zoomOut: '向下还原',
      custom: '自定义列',
      customConfirm: '确认',
      customReset: '重置',
      impTitle: '导入参数设置',
      impFile: '文件名',
      impSelect: '选择文件',
      impType: '文件类型',
      impOpts: '导入选项',
      impConfirm: '导入',
      impModeCovering: '覆盖',
      impCoveringTitle: '使用覆盖的方式将数据导入到表格中',
      impModeAppend: '追加',
      impAppendTitle: '使用追加的方式将数据导入到表格中',
      expTitle: '导出参数设置',
      expName: '文件名',
      expNamePlaceholder: '请输入文件名',
      expSheetName: '工作表名称',
      expSheetNamePlaceholder: '请输入工作表名称',
      expType: '保存类型',
      expMode: '要导出的数据',
      expAll: '全部数据',
      expSelected: '选中数据',
      expAllColumn: '全部字段',
      expColumn: '要导出的字段',
      expOpts: '导出选项',
      expOptHeader: '表头',
      expHeaderTitle: '是否需要导出表头',
      expOptFooter: '表尾',
      expFooterTitle: '是否需要导出表尾',
      expOptOriginal: '源(支持导入)',
      expOptOriginNotImp: '源(不支持导入)',
      expOriginalTitle: '是否需要导出数据源，如果勾上则支持导入到表格中',
      expPrint: '打印',
      expConfirm: '导出'
    }
  }
};
exports.default = _default;