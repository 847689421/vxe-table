<template>
  <div>
    <p class="tip">使用自定义模板渲染</p>

    <vxe-virtual-tree
      border
      resizable
      toolbar
      row-key
      :tree-config="{children: 'children'}"
      :data="tableData"
      :columns="tableColumn">
      <template v-slot:buttons>
         <vxe-input size="small" placeholder="搜索"></vxe-input>
      </template>
      <template v-slot:tools>
        <vxe-button type="primary">操作1</vxe-button>
        <vxe-button type="primary">操作2</vxe-button>
        <vxe-button type="primary">操作3</vxe-button>
      </template>
    </vxe-virtual-tree>

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
      tableData: [],
      tableColumn: [
        { type: 'seq', title: '序号', width: 80 },
        { field: 'name', title: 'app.body.label.name' },
        { field: 'size', title: 'Size' },
        {
          field: 'type',
          title: 'Type',
          slots: {
            default: ({ row }) => {
              return [
                <span>{ `类型：${row.type || '无'}` }</span>
              ]
            }
          }
        },
        {
          title: 'Image',
          treeNode: true,
          slots: {
            default: ({ row }) => {
              return [
                <img src="static/other/img1.gif" height="50"/>
              ]
            }
          }
        },
        {
          field: 'date',
          title: 'Date',
          slots: {
            default: ({ row }) => {
              return [
                <span>{ this.$utils.toDateString(row.date, 'yyyy-MM-dd HH:mm:ss.S') }</span>
              ]
            }
          }
        }
      ],
      demoCodes: [
        `
        <vxe-virtual-tree
          border
          resizable
          toolbar
          row-key
          :tree-config="{children: 'children'}"
          :data="tableData"
          :columns="tableColumn">
          <template v-slot:buttons>
            <vxe-input size="small" placeholder="搜索"></vxe-input>
          </template>
          <template v-slot:tools>
            <vxe-button type="primary">操作1</vxe-button>
            <vxe-button type="primary">操作2</vxe-button>
            <vxe-button type="primary">操作3</vxe-button>
          </template>
        </vxe-virtual-tree>
        `,
        `
        export default {
          data () {
            return {
              tableData: [],
              tableColumn: [
                { type: 'seq', title: '序号', width: 80 },
                { field: 'name', title: 'app.body.label.name' },
                { field: 'size', title: 'Size' },
                {
                  field: 'type',
                  title: 'Type',
                  slots: {
                    default: ({ row }) => {
                      return [
                        <span>{ \`类型：\${row.type || '无'}\` }</span>
                      ]
                    }
                  }
                },
                {
                  title: 'Image',
                  treeNode: true,
                  slots: {
                    default: ({ row }) => {
                      return [
                        <img src="static/other/img1.gif" height="50"/>
                      ]
                    }
                  }
                },
                {
                  field: 'date',
                  title: 'Date',
                  slots: {
                    default: ({ row }) => {
                      return [
                        <span>{ this.$utils.toDateString(row.date, 'yyyy-MM-dd HH:mm:ss.S') }</span>
                      ]
                    }
                  }
                }
              ]
            }
          },
          created () {
            this.tableData = window.MOCK_TREE_DATA_LIST.slice(0)
          }
        }
        `
      ]
    }
  },
  created () {
    this.tableData = this.$utils.clone(window.MOCK_TREE_DATA_LIST, true)
  },
  mounted () {
    Array.from(this.$el.querySelectorAll('pre code')).forEach((block) => {
      hljs.highlightBlock(block)
    })
  }
}
</script>
