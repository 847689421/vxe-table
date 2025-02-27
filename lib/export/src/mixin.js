"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _xeUtils = _interopRequireDefault(require("xe-utils/methods/xe-utils"));

var _conf = _interopRequireDefault(require("../../conf"));

var _vXETable = _interopRequireDefault(require("../../v-x-e-table"));

var _tools = require("../../tools");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var defaultHtmlStyle = 'body{margin:0}table{font-size:14px;text-align:left;border-width:1px 0 0 1px}table,td,th{border-style:solid;border-color:#e8eaec}tfoot,thead{background-color:#f8f8f9}td,th{padding:.5em .4em;border-width:0 1px 1px 0}.tree-icon-wrapper{position:relative;display:inline-block;vertical-align:middle;width:1.2em}.tree-icon{position:absolute;top:-.3em;left:0;width:0;height:0;border-style:solid;border-width:.5em;border-top-color:#939599;border-right-color:transparent;border-bottom-color:transparent;border-left-color:transparent}.tree-node{text-align:left}.tree-indent{display:inline-block}'; // 导入

var fileForm = document.createElement('form');
var fileInput = document.createElement('input');
fileForm.className = 'vxe-table--import-form';
fileInput.name = 'file';
fileInput.type = 'file';
fileForm.appendChild(fileInput); // 打印

var printFrame;

function createFrame() {
  var frame = document.createElement('iframe');
  frame.className = 'vxe-table--print-frame';
  return frame;
}

function hasTreeChildren($table, row) {
  var treeOpts = $table.treeOpts;
  return row[treeOpts.children] && row[treeOpts.children].length;
}

function handleExport($table, opts, oColumns, fullData) {
  var _getExportData = getExportData($table, opts, fullData, oColumns),
      columns = _getExportData.columns,
      datas = _getExportData.datas;

  return $table.preventEvent(null, 'event.export', {
    $table: $table,
    options: opts,
    columns: columns,
    datas: datas
  }, function () {
    return downloadFile($table, opts, getContent($table, opts, columns, datas));
  });
}

function getContent($table, opts, columns, datas) {
  switch (opts.type) {
    case 'csv':
      return toCsv($table, opts, columns, datas);

    case 'txt':
      return toTxt($table, opts, columns, datas);

    case 'html':
      return toHtml($table, opts, columns, datas);

    case 'xml':
      return toXML($table, opts, columns, datas);
  }

  return '';
}

function getSeq($table, row, rowIndex, column, columnIndex) {
  // 在 v3.0 中废弃 startIndex、indexMethod
  var seqOpts = $table.seqOpts;
  var seqMethod = seqOpts.seqMethod || column.indexMethod;
  return seqMethod ? seqMethod({
    row: row,
    rowIndex: rowIndex,
    column: column,
    columnIndex: columnIndex
  }) : (seqOpts.startIndex || $table.startIndex) + rowIndex + 1;
}

function getHeaderTitle(opts, column) {
  return (opts.original ? column.property : column.getTitle()) || '';
}

function toCsv($table, opts, columns, datas) {
  var isOriginal = opts.original;
  var content = "\uFEFF";

  if (opts.isHeader) {
    content += columns.map(function (column) {
      return "\"".concat(getHeaderTitle(opts, column), "\"");
    }).join(',') + '\n';
  }

  datas.forEach(function (row, rowIndex) {
    if (isOriginal || opts.data) {
      content += columns.map(function (column, columnIndex) {
        // v3.0 废弃 type=index
        if (column.type === 'seq' || column.type === 'index') {
          return "\"".concat(getSeq($table, row, rowIndex, column, columnIndex), "\"");
        }

        return "\"".concat(_tools.UtilTools.getCellValue(row, column) || '', "\"");
      }).join(',') + '\n';
    } else {
      content += columns.map(function (column) {
        return "\"".concat(row[column.id], "\"");
      }).join(',') + '\n';
    }
  });

  if (opts.isFooter) {
    var footerData = $table.footerData;
    var footers = opts.footerFilterMethod ? footerData.filter(opts.footerFilterMethod) : footerData;
    footers.forEach(function (rows) {
      content += columns.map(function (column) {
        return "\"".concat(rows[$table.$getColumnIndex(column)] || '', "\"");
      }).join(',') + '\n';
    });
  }

  return content;
}

function toTxt($table, opts, columns, datas) {
  var isOriginal = opts.original;
  var content = '';

  if (opts.isHeader) {
    content += columns.map(function (column) {
      return "".concat(getHeaderTitle(opts, column));
    }).join('\t') + '\n';
  }

  datas.forEach(function (row, rowIndex) {
    if (isOriginal || opts.data) {
      content += columns.map(function (column, columnIndex) {
        // v3.0 废弃 type=index
        if (column.type === 'seq' || column.type === 'index') {
          return "".concat(getSeq($table, row, rowIndex, column, columnIndex));
        }

        return "".concat(_tools.UtilTools.getCellValue(row, column) || '');
      }).join('\t') + '\n';
    } else {
      content += columns.map(function (column) {
        return "".concat(row[column.id]);
      }).join('\t') + '\n';
    }
  });

  if (opts.isFooter) {
    var footerData = $table.footerData;
    var footers = opts.footerFilterMethod ? footerData.filter(opts.footerFilterMethod) : footerData;
    footers.forEach(function (rows) {
      content += columns.map(function (column) {
        return "".concat(rows[$table.$getColumnIndex(column)] || '');
      }).join(',') + '\n';
    });
  }

  return content;
}

function toHtml($table, opts, columns, datas) {
  var treeConfig = $table.treeConfig,
      treeOpts = $table.treeOpts,
      tableFullData = $table.tableFullData;
  var isOriginal = opts.original;
  var html = ['<html>', "<head>", "<meta charset=\"utf-8\"><meta name=\"viewport\" content=\"width=device-width,initial-scale=1,minimum-scale=1,maximum-scale=1,user-scalable=no,minimal-ui\"><title>".concat(opts.sheetName, "</title>"), "<style>".concat(opts.style || defaultHtmlStyle, "</style>"), '</head>', '<body>', '<table border="1" cellspacing="0" cellpadding="0">', "<colgroup>".concat(columns.map(function (column) {
    return "<col width=\"".concat(column.renderWidth, "\">");
  }).join(''), "</colgroup>")].join('');

  if (opts.isHeader) {
    html += "<thead><tr>".concat(columns.map(function (column) {
      return "<th>".concat(getHeaderTitle(opts, column), "</th>");
    }).join(''), "</tr></thead>");
  }

  if (datas.length) {
    html += '<tbody>';

    if (treeConfig) {
      _xeUtils.default.eachTree(opts.data ? datas : tableFullData, function (row, rowIndex, items, path, parent, nodes) {
        html += '<tr>';

        if (isOriginal) {
          html += columns.map(function (column, columnIndex) {
            var cellValue = ''; // v3.0 废弃 type=index

            if (column.type === 'seq' || column.type === 'index') {
              cellValue = getSeq($table, row, rowIndex, column, columnIndex);
            } else {
              cellValue = _tools.UtilTools.getCellValue(row, column) || '';
            }

            if (column.treeNode) {
              var treeIcon = '';

              if (hasTreeChildren($table, row)) {
                treeIcon = "<i class=\"tree-icon\"></i>";
              }

              return "<td class=\"tree-node\"><span class=\"tree-indent\" style=\"width: ".concat((nodes.length - 1) * treeOpts.indent, "px\"></span><span class=\"tree-icon-wrapper\">").concat(treeIcon, "</span>").concat(cellValue, "</td>");
            }

            return "<td>".concat(cellValue, "</td>");
          }).join('');
        } else {
          html += columns.map(function (column) {
            if (column.treeNode) {
              var treeIcon = '';

              if (row._hasChild) {
                treeIcon = "<i class=\"tree-icon\"></i>";
              }

              return "<td class=\"tree-node\"><span class=\"tree-indent\" style=\"width: ".concat((nodes.length - 1) * treeOpts.indent, "px\"></span><span class=\"tree-icon-wrapper\">").concat(treeIcon, "</span>").concat(row[column.id], "</td>");
            }

            return "<td>".concat(row[column.id], "</td>");
          }).join('');
        }

        html += '</tr>';
      }, treeOpts);
    } else {
      datas.forEach(function (row, rowIndex) {
        html += '<tr>';

        if (isOriginal || opts.data) {
          html += columns.map(function (column, columnIndex) {
            var cellValue = ''; // v3.0 废弃 type=index

            if (column.type === 'seq' || column.type === 'index') {
              cellValue = getSeq($table, row, rowIndex, column, columnIndex);
            } else {
              cellValue = _tools.UtilTools.getCellValue(row, column) || '';
            }

            return "<td>".concat(cellValue, "</td>");
          }).join('');
        } else {
          html += columns.map(function (column) {
            return "<td>".concat(row[column.id], "</td>");
          }).join('');
        }

        html += '</tr>';
      });
    }

    html += '</tbody>';
  }

  if (opts.isFooter) {
    var footerData = $table.footerData;
    var footers = opts.footerFilterMethod ? footerData.filter(opts.footerFilterMethod) : footerData;

    if (footers.length) {
      html += '<tfoot>';
      footers.forEach(function (rows) {
        html += "<tr>".concat(columns.map(function (column) {
          return "<td>".concat(rows[$table.$getColumnIndex(column)] || '', "</td>");
        }).join(''), "</tr>");
      });
      html += '</tfoot>';
    }
  }

  return html + '</table></body></html>';
}

function toXML($table, opts, columns, datas) {
  var isOriginal = opts.original;
  var xml = ['<?xml version="1.0"?>', '<?mso-application progid="Excel.Sheet"?>', '<Workbook xmlns="urn:schemas-microsoft-com:office:spreadsheet" xmlns:o="urn:schemas-microsoft-com:office:office" xmlns:x="urn:schemas-microsoft-com:office:excel" xmlns:ss="urn:schemas-microsoft-com:office:spreadsheet" xmlns:html="http://www.w3.org/TR/REC-html40">', '<DocumentProperties xmlns="urn:schemas-microsoft-com:office:office">', '<Version>16.00</Version>', '</DocumentProperties>', '<ExcelWorkbook xmlns="urn:schemas-microsoft-com:office:excel">', '<WindowHeight>7920</WindowHeight>', '<WindowWidth>21570</WindowWidth>', '<WindowTopX>32767</WindowTopX>', '<WindowTopY>32767</WindowTopY>', '<ProtectStructure>False</ProtectStructure>', '<ProtectWindows>False</ProtectWindows>', '</ExcelWorkbook>', "<Worksheet ss:Name=\"".concat(opts.sheetName, "\">"), '<Table>', columns.map(function (column) {
    return "<Column ss:Width=\"".concat(column.renderWidth, "\"/>");
  }).join('')].join('');

  if (opts.isHeader) {
    xml += "<Row>".concat(columns.map(function (column) {
      return "<Cell><Data ss:Type=\"String\">".concat(getHeaderTitle(opts, column), "</Data></Cell>");
    }).join(''), "</Row>");
  }

  datas.forEach(function (row, rowIndex) {
    xml += '<Row>';

    if (isOriginal || opts.data) {
      xml += columns.map(function (column, columnIndex) {
        // v3.0 废弃 type=index
        if (column.type === 'seq' || column.type === 'index') {
          return "<Cell><Data ss:Type=\"String\">".concat(getSeq($table, row, rowIndex, column, columnIndex), "</Data></Cell>");
        }

        return "<Cell><Data ss:Type=\"String\">".concat(_tools.UtilTools.getCellValue(row, column) || '', "</Data></Cell>");
      }).join('');
    } else {
      xml += columns.map(function (column) {
        return "<Cell><Data ss:Type=\"String\">".concat(row[column.id], "</Data></Cell>");
      }).join('');
    }

    xml += '</Row>';
  });

  if (opts.isFooter) {
    var footerData = $table.footerData;
    var footers = opts.footerFilterMethod ? footerData.filter(opts.footerFilterMethod) : footerData;
    footers.forEach(function (rows) {
      xml += "<Row>".concat(columns.map(function (column) {
        return "<Cell><Data ss:Type=\"String\">".concat(rows[$table.$getColumnIndex(column) || ''], "</Data></Cell>");
      }).join(''), "</Row>");
    });
  }

  return "".concat(xml, "</Table></Worksheet></Workbook>");
}

function downloadFile($table, opts, content) {
  var filename = opts.filename,
      type = opts.type,
      download = opts.download;
  var name = "".concat(filename, ".").concat(type);

  if (window.Blob) {
    var blob = new Blob([content], {
      type: "text/".concat(type)
    });

    if (!download) {
      return Promise.resolve({
        type: type,
        content: content,
        blob: blob
      });
    }

    if (navigator.msSaveBlob) {
      navigator.msSaveBlob(blob, name);
    } else {
      var linkElem = document.createElement('a');
      linkElem.target = '_blank';
      linkElem.download = name;
      linkElem.href = URL.createObjectURL(blob);
      document.body.appendChild(linkElem);
      linkElem.click();
      document.body.removeChild(linkElem);
    }

    if (opts.message !== false) {
      $table.$XModal.message({
        message: _conf.default.i18n('vxe.table.expSuccess'),
        status: 'success'
      });
    }
  } else {
    _tools.UtilTools.error('vxe.error.notExp');
  }
}

function getLabelData($table, columns, datas) {
  var treeConfig = $table.treeConfig;
  return datas.map(function (row) {
    var item = {
      _hasChild: treeConfig && hasTreeChildren($table, row)
    };
    columns.forEach(function (column) {
      var cell = _tools.DomTools.getCell($table, {
        row: row,
        column: column
      });

      item[column.id] = cell ? cell.innerText.trim() : '';
    });
    return item;
  });
}

function getExportData($table, opts, fullData, oColumns) {
  var columns = opts.columns ? opts.columns : oColumns;
  var datas = opts.data || fullData;

  if (opts.columnFilterMethod) {
    columns = columns.filter(opts.columnFilterMethod);
  }

  if (opts.dataFilterMethod) {
    datas = datas.filter(opts.dataFilterMethod);
  }

  return {
    columns: columns,
    datas: opts.original || opts.data ? datas : getLabelData($table, columns, datas)
  };
}

function replaceDoubleQuotation(val) {
  return val.replace(/^"/, '').replace(/"$/, '');
}

function parseCsv(columns, content) {
  var list = content.split('\n');
  var fields = [];
  var rows = [];

  if (list.length) {
    var rList = list.slice(1);
    list[0].split(',').forEach(function (val) {
      var field = replaceDoubleQuotation(val);

      if (field) {
        fields.push(field);
      }
    });
    rList.forEach(function (r) {
      if (r) {
        var item = {};
        r.split(',').forEach(function (val, colIndex) {
          item[fields[colIndex]] = replaceDoubleQuotation(val);
        });
        rows.push(item);
      }
    });
  }

  return {
    fields: fields,
    rows: rows
  };
}

function parseTxt(columns, content) {
  var list = content.split('\n');
  var fields = [];
  var rows = [];

  if (list.length) {
    var rList = list.slice(1);
    list[0].split('\t').forEach(function (field) {
      if (field) {
        fields.push(field);
      }
    });
    rList.forEach(function (r) {
      if (r) {
        var item = {};
        r.split('\t').forEach(function (val, colIndex) {
          item[fields[colIndex]] = replaceDoubleQuotation(val);
        });
        rows.push(item);
      }
    });
  }

  return {
    fields: fields,
    rows: rows
  };
}

function parseHTML(columns, content) {
  var domParser = new DOMParser();
  var xmlDoc = domParser.parseFromString(content, 'text/html');
  var bodyNodes = getElementsByTagName(xmlDoc, 'body');
  var fields = [];
  var rows = [];

  if (bodyNodes.length) {
    var tableNodes = getElementsByTagName(bodyNodes[0], 'table');

    if (tableNodes.length) {
      var theadNodes = getElementsByTagName(tableNodes[0], 'thead');

      if (theadNodes.length) {
        _xeUtils.default.arrayEach(getElementsByTagName(theadNodes[0], 'tr'), function (rowNode) {
          _xeUtils.default.arrayEach(getElementsByTagName(rowNode, 'th'), function (cellNode) {
            var field = cellNode.textContent;

            if (field) {
              fields.push(field);
            }
          });
        });

        var tbodyNodes = getElementsByTagName(tableNodes[0], 'tbody');

        if (tbodyNodes.length) {
          _xeUtils.default.arrayEach(getElementsByTagName(tbodyNodes[0], 'tr'), function (rowNode) {
            var item = {};

            _xeUtils.default.arrayEach(getElementsByTagName(rowNode, 'td'), function (cellNode, colIndex) {
              item[fields[colIndex]] = cellNode.textContent || '';
            });

            rows.push(item);
          });
        }
      }
    }
  }

  return {
    fields: fields,
    rows: rows
  };
}

function parseXML(columns, content) {
  var domParser = new DOMParser();
  var xmlDoc = domParser.parseFromString(content, 'application/xml');
  var sheetNodes = getElementsByTagName(xmlDoc, 'Worksheet');
  var fields = [];
  var rows = [];

  if (sheetNodes.length) {
    var tableNodes = getElementsByTagName(sheetNodes[0], 'Table');

    if (tableNodes.length) {
      var rowNodes = getElementsByTagName(tableNodes[0], 'Row');

      if (rowNodes.length) {
        _xeUtils.default.arrayEach(getElementsByTagName(rowNodes[0], 'Cell'), function (cellNode) {
          var field = cellNode.textContent;

          if (field) {
            fields.push(field);
          }
        });

        _xeUtils.default.arrayEach(rowNodes, function (rowNode, index) {
          if (index) {
            var item = {};
            var cellNodes = getElementsByTagName(rowNode, 'Cell');

            _xeUtils.default.arrayEach(cellNodes, function (cellNode, colIndex) {
              item[fields[colIndex]] = cellNode.textContent;
            });

            rows.push(item);
          }
        });
      }
    }
  }

  return {
    fields: fields,
    rows: rows
  };
}

function getElementsByTagName(elem, qualifiedName) {
  return elem.getElementsByTagName(qualifiedName);
}
/**
 * 检查导入的列是否完整
 * @param {Array} fields 字段名列表
 * @param {Array} rows 数据列表
 */


function checkImportData(columns, fields, rows) {
  var tableFields = [];
  columns.forEach(function (column) {
    var field = column.property;

    if (field) {
      tableFields.push(field);
    }
  });
  return tableFields.every(function (field) {
    return _xeUtils.default.includes(fields, field);
  });
}

function handleImport($table, content, opts) {
  var tableFullColumn = $table.tableFullColumn,
      _importResolve = $table._importResolve;
  var rest = {
    fields: [],
    rows: []
  };

  switch (opts.type) {
    case 'csv':
      rest = parseCsv(tableFullColumn, content);
      break;

    case 'txt':
      rest = parseTxt(tableFullColumn, content);
      break;

    case 'html':
      rest = parseHTML(tableFullColumn, content);
      break;

    case 'xml':
      rest = parseXML(tableFullColumn, content);
      break;
  }

  var _rest = rest,
      fields = _rest.fields,
      rows = _rest.rows;
  var status = checkImportData(tableFullColumn, fields, rows);

  if (status) {
    $table.createData(rows).then(function (data) {
      if (opts.mode === 'append') {
        $table.insertAt(data, -1);
      } else {
        $table.reloadData(data);
      }
    });

    if (opts.message !== false) {
      $table.$XModal.message({
        message: _conf.default.i18n('vxe.table.impSuccess'),
        status: 'success'
      });
    }
  } else if (opts.message !== false) {
    $table.$XModal.message({
      message: _conf.default.i18n('vxe.error.impFields'),
      status: 'error'
    });
  }

  if (_importResolve) {
    _importResolve(status);

    $table._importResolve = null;
  }
}

var _default = {
  methods: {
    // 在 v3.0 中废弃 exportCsv 方法
    _exportCsv: function _exportCsv(options) {
      _tools.UtilTools.warn('vxe.error.delFunc', ['exportCsv', 'exportData']);

      return this.exportData(options);
    },
    _openExport: function _openExport(options) {
      if (this.$toolbar) {
        return this.$toolbar.openExport(options);
      }

      throw new Error(_tools.UtilTools.getLog('vxe.error.barUnableLink'));
    },

    /**
     * 导出文件，支持 csv/html/xml
     * 如果是树表格，则默认是导出所有节点
     * 如果是启用了虚拟滚动，则只能导出数据源，可以配合 dataFilterMethod 函数自行转换数据
     * @param {Object} options 参数
     */
    _exportData: function _exportData(options) {
      var visibleColumn = this.visibleColumn,
          scrollXLoad = this.scrollXLoad,
          scrollYLoad = this.scrollYLoad,
          treeConfig = this.treeConfig,
          treeOpts = this.treeOpts;
      var opts = Object.assign({
        filename: '',
        sheetName: '',
        original: !!treeConfig,
        message: false,
        isHeader: true,
        isFooter: true,
        download: true,
        type: 'csv',
        data: null,
        columns: null,
        // 在 v3.0 中废弃 type=selection
        columnFilterMethod: options.columns ? null : function (column) {
          return ['seq', 'index'].indexOf(column.type) || column.property && ['checkbox', 'selection', 'radio'].indexOf(column.type) === -1;
        },
        dataFilterMethod: null,
        footerFilterMethod: null
      }, _conf.default.export, options);

      if (!opts.filename) {
        opts.filename = 'export';
      }

      if (!opts.sheetName) {
        opts.sheetName = 'Sheet1';
      }

      if (!_xeUtils.default.includes(_vXETable.default.exportTypes, opts.type)) {
        throw new Error(_tools.UtilTools.getLog('vxe.error.notType', [opts.type]));
      }

      if (!opts.original) {
        if (scrollXLoad || scrollYLoad) {
          opts.original = true;

          _tools.UtilTools.warn('vxe.error.scrollOriginal');
        }
      }

      var columns = visibleColumn;
      var fullData = this.tableFullData;

      if (treeConfig) {
        fullData = _xeUtils.default.toTreeArray(fullData, treeOpts);
      }

      return handleExport(this, opts, columns, fullData);
    },
    _openImport: function _openImport(options) {
      if (this.$toolbar) {
        return this.$toolbar.openImport(options);
      }

      throw new Error(_tools.UtilTools.getLog('vxe.error.barUnableLink'));
    },
    _importByFile: function _importByFile(file, opts) {
      var _this = this;

      if (window.FileReader) {
        var _UtilTools$parseFile = _tools.UtilTools.parseFile(file),
            type = _UtilTools$parseFile.type,
            filename = _UtilTools$parseFile.filename;

        var options = Object.assign({
          mode: 'covering'
        }, opts, {
          type: type,
          filename: filename
        });
        var types = options.types || _vXETable.default.importTypes;

        if (_xeUtils.default.includes(types, type)) {
          this.preventEvent(null, 'event.import', {
            $table: this,
            file: file,
            options: options,
            columns: this.tableFullColumn
          }, function () {
            var reader = new FileReader();

            reader.onerror = function (e) {
              _tools.UtilTools.error('vxe.error.notType', [type]);
            };

            reader.onload = function (e) {
              handleImport(_this, e.target.result.trim(), options);
            };

            reader.readAsText(file, 'UTF-8');
          });
        } else {
          _tools.UtilTools.error('vxe.error.notType', [type]);
        }
      } else {
        _tools.UtilTools.error('vxe.error.notExp');
      }
    },
    _importData: function _importData(options) {
      var _this2 = this;

      var opts = Object.assign({}, _conf.default.import, options);
      var rest = new Promise(function (resolve, reject) {
        _this2._importResolve = resolve;
        _this2._importReject = reject;
      });
      this.readFile(opts).then(function (evnt) {
        return _this2.importByFile(evnt.target.files[0], opts);
      }).catch(function (evnt) {
        _this2._importReject(evnt);

        _this2._importReject = null;
      });
      return rest;
    },
    _readFile: function _readFile() {
      var _this3 = this;

      var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

      if (!fileForm.parentNode) {
        document.body.appendChild(fileForm);
      }

      var types = options.types || _vXETable.default.importTypes;

      if (options.multiple) {
        fileInput.multiple = 'multiple';
      }

      fileInput.accept = ".".concat(types.join(', .'));

      fileInput.onchange = function (evnt) {
        var _UtilTools$parseFile2 = _tools.UtilTools.parseFile(evnt.target.files[0]),
            type = _UtilTools$parseFile2.type;

        if (_xeUtils.default.includes(types, type)) {
          _this3._fileResolve(evnt);
        } else {
          if (options.message !== false) {
            _this3.$XModal.message({
              message: _xeUtils.default.template(_conf.default.i18n('vxe.error.notType'), [type]),
              status: 'error'
            });
          }

          _this3._fileReject(evnt);
        }

        _this3._fileResolve = null;
      };

      fileForm.reset();
      fileInput.click();
      return new Promise(function (resolve, reject) {
        _this3._fileResolve = resolve;
        _this3._fileReject = reject;
      });
    },
    _print: function _print(options) {
      this.exportData(Object.assign({
        original: this.scrollXLoad || this.scrollYLoad
      }, options, {
        type: 'html',
        download: false
      })).then(function (_ref) {
        var content = _ref.content,
            blob = _ref.blob;

        if (_tools.DomTools.browse.msie) {
          if (printFrame) {
            try {
              printFrame.contentDocument.write('');
              printFrame.contentDocument.clear();
            } catch (e) {}

            document.body.removeChild(printFrame);
          }

          printFrame = createFrame();
          document.body.appendChild(printFrame);
          printFrame.contentDocument.write(content);
          printFrame.contentDocument.execCommand('print');
        } else {
          if (!printFrame) {
            printFrame = createFrame();

            printFrame.onload = function (evnt) {
              if (evnt.target.src) {
                evnt.target.contentWindow.print();
              }
            };

            document.body.appendChild(printFrame);
          }

          printFrame.src = URL.createObjectURL(blob);
        }
      });
    }
  }
};
exports.default = _default;