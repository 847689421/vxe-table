<template>
  <div>
    <p class="tip">树表格、工具栏</p>

    <vxe-grid
      resizable
      highlight-hover-row
      tree-config
      row-id="id"
      :proxy-config="tableProxy"
      :columns="tableColumn"
      :toolbar="tableToolbar"
      :checkbox-config="{labelField: 'id'}"
      :edit-config="{trigger: 'click', mode: 'row', showStatus: true}"></vxe-grid>

    <p class="demo-code">{{ $t('app.body.button.showCode') }}</p>

    <pre>
      <code class="xml">{{ demoCodes[0] }}</code>
      <code class="javascript">{{ demoCodes[1] }}</code>
    </pre>
  </div>
</template>

<script>
import hljs from 'highlight.js'

export default {
  data () {
    return {
      tableProxy: {
        ajax: {
          query: () => this.$ajax.get('/api/file/list').then(data => {
            // 将带层级的列表转成树结构
            return this.$utils.toArrayTree(data, { key: 'id', parentKey: 'parentId', children: 'children' })
          }),
          save: ({ body }) => this.$ajax.post('/api/file/save', body)
        }
      },
      tableToolbar: {
        id: 'treeEdit_demo1',
        buttons: [
          { code: 'reload', name: 'app.body.button.refresh' },
          { code: 'mark_cancel', name: 'app.body.button.markCancel' },
          { code: 'save', name: 'app.body.button.save' }
        ],
        export: true,
        zoom: true,
        custom: true
      },
      tableColumn: [
        { type: 'seq', title: '序号', width: 180, treeNode: true },
        { type: 'checkbox', title: '全选', width: 120 },
        { field: 'name', title: '名称', editRender: { name: 'input' } },
        { field: 'size', title: '大小', editRender: { name: 'input' } },
        { field: 'createTime', title: 'app.body.label.createTime', formatter: this.formatterDate },
        { field: 'updateTime', title: 'app.body.label.updateTime', formatter: this.formatterDate }
      ],
      demoCodes: [
        `
        <vxe-grid
          resizable
          highlight-hover-row
          tree-config
          row-id="id"
          :proxy-config="tableProxy"
          :columns="tableColumn"
          :toolbar="tableToolbar"
          :checkbox-config="{labelField: 'id'}"
          :edit-config="{trigger: 'click', mode: 'row', showStatus: true}"></vxe-grid>
        `,
        `
        export default {
          data () {
            return {
              tableProxy: {
                ajax: {
                  query: () => this.$ajax.get('/api/file/list').then(data => {
                    // 将带层级的列表转成树结构
                    return this.$utils.toArrayTree(data, { key: 'id', parentKey: 'parentId', children: 'children' })
                  }),
                  save: ({ body }) => this.$ajax.post('/api/file/save', body)
                }
              },
              tableToolbar: {
                id: 'treeEdit_demo1',
                buttons: [
                  { code: 'reload', name: 'app.body.button.refresh' },
                  { code: 'mark_cancel', name: 'app.body.button.markCancel' },
                  { code: 'save', name: 'app.body.button.save' }
                ],
                export: true,
                zoom: true,
                custom: true
              },
              tableColumn: [
                { type: 'seq', title: '序号', width: 180, treeNode: true },
                { type: 'checkbox', title: '全选', width: 120 },
                { field: 'name', title: '名称', editRender: { name: 'input' } },
                { field: 'size', title: '大小', editRender: { name: 'input' } },
                { field: 'createTime', title: 'app.body.label.createTime', formatter: this.formatterDate },
                { field: 'updateTime', title: 'app.body.label.updateTime', formatter: this.formatterDate }
              ]
            }
          },
          methods: {
            formatterDate ({ cellValue }) {
              return this.$utils.toDateString(cellValue, 'yyyy-MM-dd HH:mm:ss')
            }
          }
        }
        `
      ]
    }
  },
  mounted () {
    Array.from(this.$el.querySelectorAll('pre code')).forEach((block) => {
      hljs.highlightBlock(block)
    })
  },
  methods: {
    formatterDate ({ cellValue }) {
      return this.$utils.toDateString(cellValue, 'yyyy-MM-dd HH:mm:ss')
    }
  }
}
</script>
