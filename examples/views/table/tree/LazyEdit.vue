<template>
  <div>
    <p class="tip">可编辑树表格的懒加载</p>

    <vxe-toolbar>
      <template v-slot:buttons>
        <vxe-button @click="getUpdateEvent">获取修改</vxe-button>
      </template>
    </vxe-toolbar>

    <vxe-table
      border
      resizable
      ref="xTree"
      row-id="id"
      :loading="loading"
      :edit-config="{trigger: 'click', mode: 'row', showStatus: true}"
      :tree-config="{lazy: true, children: 'children', hasChild: 'hasChild', loadMethod: loadChildrenMethod}"
      :data="tableData">
      <vxe-table-column type="seq" width="260" tree-node></vxe-table-column>
      <vxe-table-column field="name" title="Name" :edit-render="{name: 'input'}"></vxe-table-column>
      <vxe-table-column field="size" title="Size" :edit-render="{name: 'input'}"></vxe-table-column>
      <vxe-table-column field="type" title="Type" :edit-render="{name: 'input'}"></vxe-table-column>
      <vxe-table-column field="date" title="Date" :edit-render="{name: 'input'}"></vxe-table-column>
    </vxe-table>

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
      loading: false,
      tableData: [],
      defaultExpandRowKeys: [],
      demoCodes: [
        `
        <vxe-toolbar>
          <template v-slot:buttons>
            <vxe-button @click="getUpdateEvent">获取修改</vxe-button>
          </template>
        </vxe-toolbar>

        <vxe-table
          border
          resizable
          ref="xTree"
          row-id="id"
          :loading="loading"
          :edit-config="{trigger: 'click', mode: 'row', showStatus: true}"
          :tree-config="{lazy: true, children: 'children', hasChild: 'hasChild', loadMethod: loadChildrenMethod}"
          :data="tableData">
          <vxe-table-column type="seq" width="260" tree-node></vxe-table-column>
          <vxe-table-column field="name" title="Name" :edit-render="{name: 'input'}"></vxe-table-column>
          <vxe-table-column field="size" title="Size" :edit-render="{name: 'input'}"></vxe-table-column>
          <vxe-table-column field="type" title="Type" :edit-render="{name: 'input'}"></vxe-table-column>
          <vxe-table-column field="date" title="Date" :edit-render="{name: 'input'}"></vxe-table-column>
        </vxe-table>
        `,
        `
        export default {
          data () {
            return {
              loading: false,
              tableData: []
            }
          },
          created () {
            this.findList()
          },
          methods: {
            findList () {
              this.loading = true
              this.$ajax.get('/api/file/node/list', { parentId: null }).then(data => {
                this.tableData = data
                this.loading = false
              })
            },
            loadChildrenMethod ({ row }) {
              // 异步加载子节点
              return this.$ajax.get('/api/file/node/list', { parentId: row.id })
            }
          }
        }
        `
      ]
    }
  },
  created () {
    this.findList()
  },
  mounted () {
    Array.from(this.$el.querySelectorAll('pre code')).forEach((block) => {
      hljs.highlightBlock(block)
    })
  },
  methods: {
    findList () {
      this.loading = true
      this.$ajax.get('/api/file/node/list', { parentId: null }).then(data => {
        this.tableData = data
        this.loading = false
      })
    },
    loadChildrenMethod ({ row }) {
      // 异步加载子节点
      return this.$ajax.get('/api/file/node/list', { parentId: row.id })
    },
    getUpdateEvent () {
      let updateRecords = this.$refs.xTree.getUpdateRecords()
      this.$XModal.alert(updateRecords.length)
    }
  }
}
</script>
