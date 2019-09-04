import XEUtils from 'xe-utils'
import tableAPI from './table'
import columnAPI from './column'
import toolbarAPI from './toolbar'

const apis = [
  {
    name: 'Props',
    descKey: 'app.api.title.props',
    type: '',
    enum: '',
    defVal: '',
    list: [
      {
        name: 'toolbar',
        descKey: 'app.api.grid.desc.toolbar',
        type: 'Object',
        enum: '',
        defVal: '',
        list: XEUtils.clone(toolbarAPI.find(item => item.name === 'Props').list, true).concat([{
          name: 'slots',
          descKey: 'app.api.title.slots',
          type: 'Object',
          enum: '',
          defVal: '',
          list: XEUtils.clone(toolbarAPI.find(item => item.name === 'Slots').list, true)
        }])
      },
      {
        name: 'pager-config',
        descKey: 'app.api.grid.desc.pagerConfig',
        type: 'Object',
        enum: '',
        defVal: '',
        list: [
          {
            name: 'current-page',
            desc: '当前页',
            type: 'Number',
            enum: '',
            defVal: '1',
            list: []
          },
          {
            name: 'page-size',
            desc: '每页大小',
            type: 'Number',
            enum: '',
            defVal: '10',
            list: []
          },
          {
            name: 'total',
            desc: '总条数',
            type: 'Number',
            enum: '',
            defVal: '0',
            list: []
          },
          {
            name: 'pager-count',
            desc: '显示页码按钮的数量',
            type: 'Number',
            enum: '',
            defVal: '7',
            list: []
          },
          {
            name: 'page-sizes',
            desc: '每页大小选项列表',
            type: 'Array',
            enum: '',
            defVal: '[10,15,20,50,100]',
            list: []
          },
          {
            name: 'background',
            desc: '带背景颜色',
            type: 'Boolean',
            enum: '',
            defVal: 'false',
            list: []
          }
        ]
      },
      {
        name: 'proxy-config',
        descKey: 'app.api.grid.desc.proxyConfig',
        type: 'Object',
        enum: '',
        defVal: '',
        list: [
          {
            name: 'autoLoad',
            desc: '是否自动加载查询数据',
            type: 'Boolean',
            enum: '',
            defVal: 'true',
            list: []
          },
          {
            name: 'message',
            desc: '是否显示消息提示',
            type: 'Boolean',
            enum: '',
            defVal: 'true',
            list: []
          },
          {
            name: 'index',
            desc: '存在 type=index 列时有效，是否代理动态序号（根据分页动态变化）',
            type: 'Boolean',
            enum: '',
            defVal: 'false',
            list: []
          },
          {
            name: 'sort',
            desc: '是否代理排序',
            type: 'Boolean',
            enum: '',
            defVal: 'false',
            list: []
          },
          {
            name: 'filter',
            desc: '是否代理筛选',
            type: 'Boolean',
            enum: '',
            defVal: 'false',
            list: []
          },
          {
            name: 'props',
            desc: '获取的属性配置',
            type: 'Object',
            enum: '',
            defVal: '',
            list: [
              {
                name: 'list',
                desc: '响应结果中获取数据列表的属性',
                type: 'String',
                enum: '',
                defVal: '',
                list: []
              },
              {
                name: 'data',
                disabled: true,
                desc: '即将废弃，请使用 result',
                type: 'String',
                enum: '',
                defVal: 'result',
                list: []
              },
              {
                name: 'result',
                desc: '只对 pager-config 配置了有效，响应结果中获取数据列表的属性',
                type: 'String',
                enum: '',
                defVal: 'result',
                list: []
              },
              {
                name: 'total',
                desc: '只对 pager-config 配置了有效，响应结果中获取分页的属性',
                type: 'String',
                enum: '',
                defVal: 'page.total',
                list: []
              }
            ]
          },
          {
            name: 'ajax',
            desc: '代理配置（任何使用 Promise API 的任何库都可以对接数据代理）',
            type: 'Object',
            enum: '',
            defVal: '',
            list: [
              {
                name: 'query',
                desc: '查询方法 Function({ page, sort, filters }, ...arguments)，默认处理的数据结构 {page: {total: 0}, result: []}；如果使用了服务端排序，sort 属性可以获取相关信息；如果使用了服务端过滤，filter 属性可以获取相关信息',
                type: 'Function / Promise',
                enum: '',
                defVal: '',
                list: []
              },
              {
                name: 'delete',
                desc: '删除方法 Function({ body }, ...arguments)，提交的参数 { removeRecords }',
                type: 'Function / Promise',
                enum: '',
                defVal: '',
                list: []
              },
              {
                name: 'save',
                desc: '保存方法 Function({ body }, ...arguments)，提交的参数 { insertRecords, updateRecords, removeRecords, pendingRecords}',
                type: 'Function / Promise',
                enum: '',
                defVal: '',
                list: []
              }
            ]
          }
        ]
      }
    ]
  },
  {
    name: 'Slots',
    descKey: 'app.api.title.slots',
    type: '',
    enum: '',
    defVal: '',
    list: []
  },
  {
    name: 'Events',
    descKey: 'app.api.title.events',
    type: '',
    enum: '',
    defVal: '',
    list: [
      {
        name: 'current-page-change',
        desc: '只对 pager-config 配置时有效，当前页发生改变时会触发该事件',
        type: '',
        enum: '',
        defVal: 'currentPage',
        list: []
      },
      {
        name: 'page-size-change',
        desc: '只对 pager-config 配置时有效，每页大小发生改变时会触发该事件',
        type: '',
        enum: '',
        defVal: 'pageSize',
        list: []
      },
      {
        name: 'page-change',
        desc: '只对 pager-config 配置时有效，分页发生改变时会触发该事件',
        type: '',
        enum: '',
        defVal: '{type, currentPage, pageSize}',
        list: []
      },
      {
        name: 'toolbar-button-click',
        desc: '只对 toolbar.buttons 配置时有效，当工具栏的按钮被点击时会后触发该事件',
        type: '',
        enum: '',
        defVal: '{code}, event',
        list: []
      }
    ]
  },
  {
    name: 'Methods',
    descKey: 'app.api.title.methods',
    type: '',
    enum: '',
    defVal: '',
    list: [
      {
        name: 'commitProxy(code, ...arguments)',
        desc: '给数据代理提交指令（支持额外的参数，对于很多特殊场景很有用）',
        type: '',
        enum: 'reload, query, delete, save',
        defVal: '',
        list: []
      }
    ]
  }
]

const gridAPI = XEUtils.clone(tableAPI, true).map(item => {
  let rest = apis.find(obj => obj.name === item.name)
  rest.list = item.list.concat(rest.list)
  return rest
})

XEUtils.eachTree(gridAPI, (item, index, obj, paths, parent) => {
  if (parent && parent.name === 'buttons' && item.name === 'code') {
    item.list = [
      {
        name: 'reload',
        desc: '刷新数据，会重置分页；触发 ajax.query 方法',
        type: '',
        enum: '',
        defVal: '',
        list: []
      },
      {
        name: 'query',
        desc: '刷新数据；会自动触发 ajax.query 方法',
        type: '',
        enum: '',
        defVal: '',
        list: []
      },
      {
        name: 'insert',
        desc: '新增数据',
        type: '',
        enum: '',
        defVal: '',
        list: []
      },
      {
        name: 'insert_actived',
        desc: '新增数据并且默认激活第一个可编辑的单元格',
        type: '',
        enum: '',
        defVal: '',
        list: []
      },
      {
        name: 'mark_cancel',
        desc: '将选中的数据标记或取消删除',
        type: '',
        enum: '',
        defVal: '',
        list: []
      },
      {
        name: 'delete_selection',
        desc: '删除选中行；会自动触发 ajax.delete 方法',
        type: '',
        enum: '',
        defVal: '',
        list: []
      },
      {
        name: 'remove_selection',
        desc: '移除选中行',
        type: '',
        enum: '',
        defVal: '',
        list: []
      },
      {
        name: 'save',
        desc: '保存数据；会自动触发 ajax.save 方法，并且在 Promise 完成之后重新触发 ajax.query 方法',
        type: '',
        enum: '',
        defVal: '',
        list: []
      },
      {
        name: 'export',
        desc: '导出数据',
        type: '',
        enum: '',
        defVal: '',
        list: []
      },
      {
        name: 'reset_custom',
        desc: '重置个性化数据（显示/隐藏列、列宽拖动状态）',
        type: '',
        enum: '',
        defVal: '',
        list: []
      }
    ]
  }
}, { children: 'list' })

gridAPI.find(item => item.name === 'Props').list.splice(1, 0, {
  name: 'columns',
  descKey: 'app.api.table.desc.columns',
  type: 'Array',
  enum: '',
  defVal: '',
  list: XEUtils.mapTree(columnAPI.find(item => item.name === 'Props').list, item => Object.assign({}, item, { name: XEUtils.camelCase(item.name) }))
})

export default gridAPI
