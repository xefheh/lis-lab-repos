/*
   Licensed to the Apache Software Foundation (ASF) under one or more
   contributor license agreements.  See the NOTICE file distributed with
   this work for additional information regarding copyright ownership.
   The ASF licenses this file to You under the Apache License, Version 2.0
   (the "License"); you may not use this file except in compliance with
   the License.  You may obtain a copy of the License at

       http://www.apache.org/licenses/LICENSE-2.0

   Unless required by applicable law or agreed to in writing, software
   distributed under the License is distributed on an "AS IS" BASIS,
   WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   See the License for the specific language governing permissions and
   limitations under the License.
*/
var showControllersOnly = false;
var seriesFilter = "";
var filtersOnlySampleSeries = true;

/*
 * Add header in statistics table to group metrics by category
 * format
 *
 */
function summaryTableHeader(header) {
    var newRow = header.insertRow(-1);
    newRow.className = "tablesorter-no-sort";
    var cell = document.createElement('th');
    cell.setAttribute("data-sorter", false);
    cell.colSpan = 1;
    cell.innerHTML = "Requests";
    newRow.appendChild(cell);

    cell = document.createElement('th');
    cell.setAttribute("data-sorter", false);
    cell.colSpan = 3;
    cell.innerHTML = "Executions";
    newRow.appendChild(cell);

    cell = document.createElement('th');
    cell.setAttribute("data-sorter", false);
    cell.colSpan = 7;
    cell.innerHTML = "Response Times (ms)";
    newRow.appendChild(cell);

    cell = document.createElement('th');
    cell.setAttribute("data-sorter", false);
    cell.colSpan = 1;
    cell.innerHTML = "Throughput";
    newRow.appendChild(cell);

    cell = document.createElement('th');
    cell.setAttribute("data-sorter", false);
    cell.colSpan = 2;
    cell.innerHTML = "Network (KB/sec)";
    newRow.appendChild(cell);
}

/*
 * Populates the table identified by id parameter with the specified data and
 * format
 *
 */
function createTable(table, info, formatter, defaultSorts, seriesIndex, headerCreator) {
    var tableRef = table[0];

    // Create header and populate it with data.titles array
    var header = tableRef.createTHead();

    // Call callback is available
    if(headerCreator) {
        headerCreator(header);
    }

    var newRow = header.insertRow(-1);
    for (var index = 0; index < info.titles.length; index++) {
        var cell = document.createElement('th');
        cell.innerHTML = info.titles[index];
        newRow.appendChild(cell);
    }

    var tBody;

    // Create overall body if defined
    if(info.overall){
        tBody = document.createElement('tbody');
        tBody.className = "tablesorter-no-sort";
        tableRef.appendChild(tBody);
        var newRow = tBody.insertRow(-1);
        var data = info.overall.data;
        for(var index=0;index < data.length; index++){
            var cell = newRow.insertCell(-1);
            cell.innerHTML = formatter ? formatter(index, data[index]): data[index];
        }
    }

    // Create regular body
    tBody = document.createElement('tbody');
    tableRef.appendChild(tBody);

    var regexp;
    if(seriesFilter) {
        regexp = new RegExp(seriesFilter, 'i');
    }
    // Populate body with data.items array
    for(var index=0; index < info.items.length; index++){
        var item = info.items[index];
        if((!regexp || filtersOnlySampleSeries && !info.supportsControllersDiscrimination || regexp.test(item.data[seriesIndex]))
                &&
                (!showControllersOnly || !info.supportsControllersDiscrimination || item.isController)){
            if(item.data.length > 0) {
                var newRow = tBody.insertRow(-1);
                for(var col=0; col < item.data.length; col++){
                    var cell = newRow.insertCell(-1);
                    cell.innerHTML = formatter ? formatter(col, item.data[col]) : item.data[col];
                }
            }
        }
    }

    // Add support of columns sort
    table.tablesorter({sortList : defaultSorts});
}

$(document).ready(function() {

    // Customize table sorter default options
    $.extend( $.tablesorter.defaults, {
        theme: 'blue',
        cssInfoBlock: "tablesorter-no-sort",
        widthFixed: true,
        widgets: ['zebra']
    });

    var data = {"OkPercent": 89.28571428571429, "KoPercent": 10.714285714285714};
    var dataset = [
        {
            "label" : "FAIL",
            "data" : data.KoPercent,
            "color" : "#FF6347"
        },
        {
            "label" : "PASS",
            "data" : data.OkPercent,
            "color" : "#9ACD32"
        }];
    $.plot($("#flot-requests-summary"), dataset, {
        series : {
            pie : {
                show : true,
                radius : 1,
                label : {
                    show : true,
                    radius : 3 / 4,
                    formatter : function(label, series) {
                        return '<div style="font-size:8pt;text-align:center;padding:2px;color:white;">'
                            + label
                            + '<br/>'
                            + Math.round10(series.percent, -2)
                            + '%</div>';
                    },
                    background : {
                        opacity : 0.5,
                        color : '#000'
                    }
                }
            }
        },
        legend : {
            show : true
        }
    });

    // Creates APDEX table
    createTable($("#apdexTable"), {"supportsControllersDiscrimination": true, "overall": {"data": [0.6707142857142857, 500, 1500, "Total"], "isController": false}, "titles": ["Apdex", "T (Toleration threshold)", "F (Frustration threshold)", "Label"], "items": [{"data": [0.0, 500, 1500, "/catalog/termometry-18"], "isController": false}, {"data": [0.09, 500, 1500, "/order-27-1"], "isController": false}, {"data": [1.0, 500, 1500, "/success.txt-20"], "isController": false}, {"data": [0.52, 500, 1500, "/order-27-0"], "isController": false}, {"data": [1.0, 500, 1500, "/success.txt-21"], "isController": false}, {"data": [1.0, 500, 1500, "/canonical.html-6"], "isController": false}, {"data": [1.0, 500, 1500, "/success.txt-25"], "isController": false}, {"data": [1.0, 500, 1500, "/success.txt-26"], "isController": false}, {"data": [1.0, 500, 1500, "/success.txt-29"], "isController": false}, {"data": [0.15, 500, 1500, "/-5"], "isController": false}, {"data": [1.0, 500, 1500, "/canonical.html-13"], "isController": false}, {"data": [0.0, 500, 1500, "/cart-23"], "isController": false}, {"data": [0.0, 500, 1500, "/catalog/add/914-22"], "isController": false}, {"data": [1.0, 500, 1500, "/canonical.html-19"], "isController": false}, {"data": [1.0, 500, 1500, "/success.txt-30"], "isController": false}, {"data": [1.0, 500, 1500, "/success.txt-10"], "isController": false}, {"data": [1.0, 500, 1500, "/success.txt-11"], "isController": false}, {"data": [1.0, 500, 1500, "/success.txt-8"], "isController": false}, {"data": [1.0, 500, 1500, "/success.txt-7"], "isController": false}, {"data": [1.0, 500, 1500, "/success.txt-14"], "isController": false}, {"data": [1.0, 500, 1500, "/success.txt-15"], "isController": false}, {"data": [0.0, 500, 1500, "/catalog/add/11-16"], "isController": false}, {"data": [0.0, 500, 1500, "/catalog/add/169-17"], "isController": false}, {"data": [0.02, 500, 1500, "/order-27"], "isController": false}, {"data": [0.0, 500, 1500, "/catalog/ratsii-1-12"], "isController": false}, {"data": [1.0, 500, 1500, "/canonical.html-9"], "isController": false}, {"data": [1.0, 500, 1500, "/canonical.html-24"], "isController": false}, {"data": [1.0, 500, 1500, "/canonical.html-28"], "isController": false}]}, function(index, item){
        switch(index){
            case 0:
                item = item.toFixed(3);
                break;
            case 1:
            case 2:
                item = formatDuration(item);
                break;
        }
        return item;
    }, [[0, 0]], 3);

    // Create statistics table
    createTable($("#statisticsTable"), {"supportsControllersDiscrimination": true, "overall": {"data": ["Total", 1400, 150, 10.714285714285714, 706.533571428571, 42, 4428, 56.0, 2561.9, 2960.3000000000006, 3598.7700000000004, 76.64932931836846, 228.442536528196, 29.339648063235696], "isController": false}, "titles": ["Label", "#Samples", "FAIL", "Error %", "Average", "Min", "Max", "Median", "90th pct", "95th pct", "99th pct", "Transactions/s", "Received", "Sent"], "items": [{"data": ["/catalog/termometry-18", 50, 0, 0.0, 2628.4000000000005, 1629, 3817, 2650.0, 3040.6, 3131.35, 3817.0, 7.782101167315175, 110.91272495136187, 3.328672178988327], "isController": false}, {"data": ["/order-27-1", 50, 0, 0.0, 2029.2199999999993, 816, 3012, 2144.5, 2608.8, 2671.45, 3012.0, 10.869565217391305, 80.01804517663044, 4.373301630434783], "isController": false}, {"data": ["/success.txt-20", 50, 0, 0.0, 50.89999999999999, 43, 62, 51.0, 57.9, 60.449999999999996, 62.0, 12.94665976178146, 2.73017745015536, 4.121690510098395], "isController": false}, {"data": ["/order-27-0", 50, 0, 0.0, 850.44, 320, 1150, 854.0, 1032.6, 1091.7999999999997, 1150.0, 10.550749103186325, 13.03223583561933, 4.255331425406204], "isController": false}, {"data": ["/success.txt-21", 50, 0, 0.0, 50.800000000000004, 42, 60, 51.5, 57.9, 58.449999999999996, 60.0, 12.933264355923434, 2.7273526416192446, 4.117425957061562], "isController": false}, {"data": ["/canonical.html-6", 50, 0, 0.0, 104.74, 87, 130, 104.5, 121.8, 125.44999999999999, 130.0, 17.355085039916695, 5.050261953314822, 5.491257375911142], "isController": false}, {"data": ["/success.txt-25", 50, 0, 0.0, 50.98, 42, 60, 51.0, 58.9, 60.0, 60.0, 11.665888940737284, 2.4600899002566496, 3.713945111992534], "isController": false}, {"data": ["/success.txt-26", 50, 0, 0.0, 50.76, 42, 62, 50.5, 57.9, 59.449999999999996, 62.0, 11.663167716351762, 2.4595160514345698, 3.713078784697924], "isController": false}, {"data": ["/success.txt-29", 50, 0, 0.0, 51.01999999999999, 43, 60, 51.5, 57.0, 58.449999999999996, 60.0, 22.341376228775694, 4.711324983243967, 7.112586572832886], "isController": false}, {"data": ["/-5", 50, 0, 0.0, 1893.3799999999997, 830, 3019, 2005.0, 2723.6, 2800.35, 3019.0, 13.781697905181918, 212.9414988457828, 5.49114525909592], "isController": false}, {"data": ["/canonical.html-13", 50, 0, 0.0, 51.30000000000001, 43, 61, 52.0, 57.0, 58.449999999999996, 61.0, 12.171372930866601, 3.54182197845667, 3.851098466407011], "isController": false}, {"data": ["/cart-23", 50, 0, 0.0, 2340.1999999999994, 1620, 3005, 2374.0, 2670.0, 2767.9, 3005.0, 7.838219156607618, 57.70046857853896, 3.2608216413230915], "isController": false}, {"data": ["/catalog/add/914-22", 50, 50, 100.0, 877.9399999999999, 453, 2230, 862.5, 1016.1, 1114.3999999999996, 2230.0, 10.245901639344261, 29.73392674180328, 5.943423411885246], "isController": false}, {"data": ["/canonical.html-19", 50, 0, 0.0, 52.99999999999999, 42, 70, 52.0, 62.0, 66.14999999999998, 70.0, 12.923235978288965, 3.760611188291548, 4.088992633755492], "isController": false}, {"data": ["/success.txt-30", 50, 0, 0.0, 51.02000000000001, 42, 62, 51.5, 56.9, 60.0, 62.0, 22.331397945511387, 4.709220773782939, 7.10940989280929], "isController": false}, {"data": ["/success.txt-10", 50, 0, 0.0, 51.68, 42, 64, 52.0, 59.9, 61.0, 64.0, 17.7430801987225, 3.741641345812633, 5.64867592264017], "isController": false}, {"data": ["/success.txt-11", 50, 0, 0.0, 51.80000000000001, 42, 76, 52.0, 57.9, 60.449999999999996, 76.0, 17.72421127259837, 3.7376622873094645, 5.642668823112371], "isController": false}, {"data": ["/success.txt-8", 50, 0, 0.0, 52.379999999999995, 43, 88, 52.0, 59.9, 65.35, 88.0, 17.73049645390071, 3.7389876994680855, 5.644669769503547], "isController": false}, {"data": ["/success.txt-7", 50, 0, 0.0, 51.04000000000002, 43, 65, 52.0, 56.9, 59.0, 65.0, 17.71793054571226, 3.7363378144932673, 5.640669294826364], "isController": false}, {"data": ["/success.txt-14", 50, 0, 0.0, 51.320000000000014, 43, 65, 51.5, 57.9, 60.0, 65.0, 12.174336498660823, 2.567310765157049, 3.875814158753348], "isController": false}, {"data": ["/success.txt-15", 50, 0, 0.0, 51.279999999999994, 43, 68, 51.5, 58.0, 61.0, 68.0, 12.177301509985387, 2.567936023502192, 3.8767580979055043], "isController": false}, {"data": ["/catalog/add/11-16", 50, 50, 100.0, 1153.02, 624, 2094, 1034.5, 1665.8, 1869.8999999999992, 2094.0, 10.13787510137875, 29.421222374290345, 5.8510587743309], "isController": false}, {"data": ["/catalog/add/169-17", 50, 50, 100.0, 949.1000000000001, 519, 1281, 993.0, 1164.1, 1209.8, 1281.0, 11.534025374855824, 33.477058102652826, 6.668108419838524], "isController": false}, {"data": ["/order-27", 50, 0, 0.0, 2879.7400000000002, 1315, 4046, 2984.0, 3523.8, 3654.2999999999993, 4046.0, 9.000900090009, 77.37943716246625, 7.251701732673268], "isController": false}, {"data": ["/catalog/ratsii-1-12", 50, 0, 0.0, 3204.94, 2430, 4428, 3239.5, 3862.8, 4034.5499999999993, 4428.0, 7.701786814540974, 124.8342310728589, 3.1589359981515712], "isController": false}, {"data": ["/canonical.html-9", 50, 0, 0.0, 51.28000000000001, 44, 69, 51.0, 57.9, 60.449999999999996, 69.0, 17.71793054571226, 5.155848578136074, 5.60606396172927], "isController": false}, {"data": ["/canonical.html-24", 50, 0, 0.0, 50.7, 44, 60, 51.0, 56.9, 59.449999999999996, 60.0, 11.665888940737284, 3.3947281118758754, 3.691160172655157], "isController": false}, {"data": ["/canonical.html-28", 50, 0, 0.0, 50.560000000000024, 42, 60, 51.0, 56.0, 58.0, 60.0, 22.35136343316942, 6.504159449038891, 7.072111086276262], "isController": false}]}, function(index, item){
        switch(index){
            // Errors pct
            case 3:
                item = item.toFixed(2) + '%';
                break;
            // Mean
            case 4:
            // Mean
            case 7:
            // Median
            case 8:
            // Percentile 1
            case 9:
            // Percentile 2
            case 10:
            // Percentile 3
            case 11:
            // Throughput
            case 12:
            // Kbytes/s
            case 13:
            // Sent Kbytes/s
                item = item.toFixed(2);
                break;
        }
        return item;
    }, [[0, 0]], 0, summaryTableHeader);

    // Create error table
    createTable($("#errorsTable"), {"supportsControllersDiscrimination": false, "titles": ["Type of error", "Number of errors", "% in errors", "% in all samples"], "items": [{"data": ["500/Internal Server Error", 150, 100.0, 10.714285714285714], "isController": false}]}, function(index, item){
        switch(index){
            case 2:
            case 3:
                item = item.toFixed(2) + '%';
                break;
        }
        return item;
    }, [[1, 1]]);

        // Create top5 errors by sampler
    createTable($("#top5ErrorsBySamplerTable"), {"supportsControllersDiscrimination": false, "overall": {"data": ["Total", 1400, 150, "500/Internal Server Error", 150, "", "", "", "", "", "", "", ""], "isController": false}, "titles": ["Sample", "#Samples", "#Errors", "Error", "#Errors", "Error", "#Errors", "Error", "#Errors", "Error", "#Errors", "Error", "#Errors"], "items": [{"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": ["/catalog/add/914-22", 50, 50, "500/Internal Server Error", 50, "", "", "", "", "", "", "", ""], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": ["/catalog/add/11-16", 50, 50, "500/Internal Server Error", 50, "", "", "", "", "", "", "", ""], "isController": false}, {"data": ["/catalog/add/169-17", 50, 50, "500/Internal Server Error", 50, "", "", "", "", "", "", "", ""], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}]}, function(index, item){
        return item;
    }, [[0, 0]], 0);

});
