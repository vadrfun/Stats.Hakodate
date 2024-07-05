const folderName = document.getElementById("box");
const imgsArea = document.getElementById("imgs");
const imgArea = document.getElementById("img");
const plusButton = document.getElementById("plus_size");
const minusButton = document.getElementById("minus_size");
const output_csv = document.getElementById('table_list');
const img_dist_left = $('#img').offset().left;
const img_dist_top = $('#img').offset().top;
const csv_dist_left = $('#csv').offset().left;
const csv_dist_top = $('#csv').offset().top;

//データベースを作る
const db = new Dexie("Stats-Hakodate");

//「Stats-Hakodate」というデータベース内に，「」という名前のテーブルを作成．
db.version(2)
  .stores({
    //time: タイムスタンプ，file: ファイル名, row: 行, col: 列，revision: 訂正前, correction: 訂正後，type: 型，remarks: 備考欄
    proofreading: "time,file,row,col,revision,correction,type,remarks"  
  });

db.version(3)
  .stores({
    pattern: "name,time"  
  });

db.version(5)
  .stores({
    //time: 時刻, src: ファイルパス, backgroundcolor: 背景色
    c_status: "src,time,backgroundcolor"  
  });

/*jpegファイル*/

/*気象3*/
const adminWeather = ['pdf03_0203.jpeg', 'pdf03_0405.jpeg', 'pdf03_0607.jpeg'];
/*土地6*/
const adminLand = ['pdf03_0809.jpeg', 'pdf03_1011.jpeg', 'pdf03_1213.jpeg', 'pdf03_14_1.jpeg', 'pdf03_14_2.jpeg', 'pdf03_15.jpeg'];
/*人口19*/
const adminPopulation = ['pdf03_1617.jpeg', 'pdf03_1819.jpeg', 'pdf03_2021.jpeg', 'pdf03_2223_page22.jpeg', 'pdf03_2223_page23.jpeg', 'pdf03_2425.jpeg', 'pdf03_2627.jpeg', 'pdf03_28293031.jpeg', 'pdf03_3233.jpeg', 'pdf03_3435.jpeg', 'pdf03_3637.jpeg', 'pdf03_3839.jpeg', 'pdf03_4041.jpeg', 'pdf03_4243.jpeg', 'pdf03_4445.jpeg', 'pdf03_4647.jpeg', 'pdf03_4849.jpeg', 'pdf03_50.jpeg', 'pdf03_51.jpeg'];
/*財政130*/
const adminFinance = ['pdf03_5253.jpeg', 'pdf03_5455.jpeg', 'pdf03_5657580102.jpeg',  'pdf04_0304050607.jpeg',  'pdf04_08091011.jpeg',  'pdf04_12131415.jpeg',  'pdf04_16171819_20212223.jpeg',  'pdf04_24252627.jpeg',  'pdf04_28293031.jpeg',  'pdf04_3233.jpeg', 'pdf04_3435.jpeg',  'pdf04_3637.jpeg', 'pdf04_383940.jpeg',  'pdf04_414243.jpeg',  'pdf04_444546.jpeg',  'pdf04_474849.jpeg',  'pdf04_505152.jpeg',  'pdf04_535455.jpeg',  'pdf04_565758.jpeg',  'pdf04_596061.jpeg',  'pdf04_626364.jpeg',  'pdf04_656667.jpeg',  'pdf04_686970.jpeg',  'pdf04_717273.jpeg',  'pdf04_747576.jpeg',  'pdf04_777879.jpeg',  'pdf04_8001.jpeg',  'pdf05_0203.jpeg',  'pdf05_0405.jpeg',  'pdf05_0607.jpeg',  'pdf05_0809.jpeg',  'pdf05_1011.jpeg',  'pdf05_1213.jpeg',  'pdf05_141516.jpeg',  'pdf05_171819.jpeg',  'pdf05_202122.jpeg',  'pdf05_232425.jpeg',  'pdf05_262728.jpeg', 'pdf05_293031.jpeg',  'pdf05_323334.jpeg',  'pdf05_353637.jpeg',  'pdf05_383940.jpeg',  'pdf05_414243.jpeg',  'pdf05_44_page45.jpeg',  'pdf05_44_page46.jpeg',  'pdf05_44_page47.jpeg',  'pdf05_44_page48.jpeg',  'pdf05_44_page49.jpeg',  'pdf05_44_page50.jpeg',  'pdf05_44_page51.jpeg',  'pdf05_44_page52.jpeg',  'pdf05_45_page53.jpeg', 'pdf05_45_page54.jpeg', 'pdf05_45_page55.jpeg', 'pdf05_45_page56.jpeg', 'pdf05_4647_page5758.jpeg',  'pdf05_4647_page5960.jpeg',  'pdf05_4849_page6162.jpeg',  'pdf05_4849_page6364.jpeg',  'pdf05_5051.jpeg',  'pdf05_525354.jpeg',  'pdf05_55.jpeg', 'pdf05_5657.jpeg',  'pdf05_58_page73.jpeg', 'pdf05_58_page74.jpeg', 'pdf05_58_page75.jpeg', 'pdf05_58_page76.jpeg', 'pdf05_58_page77.jpeg', 'pdf05_59_page78.jpeg', 'pdf05_59_page79.jpeg', 'pdf05_59_page80.jpeg', 'pdf05_6061_page8182.jpeg', 'pdf05_6061_page8384.jpeg', 'pdf05_6061_page8586.jpeg', 'pdf05_62636465.jpeg',  'pdf05_66.jpeg', 'pdf05_67_page92.jpeg', 'pdf05_67_page93.jpeg', 'pdf05_6869_page94959697.jpeg',  'pdf05_70717273_page9899104105.jpeg', 'pdf05_70717273_page100101106107.jpeg', 'pdf05_70717273_page102103.jpeg',  'pdf05_747576_page108109114.jpeg', 'pdf05_747576_page110111115.jpeg', 'pdf05_747576_page112113.jpeg', 'pdf05_747576_page116.jpeg',  'pdf05_777879.jpeg',  'pdf05_80_page120.jpeg', 'pdf05_80_page121.jpeg', 'pdf06_01.jpeg', 'pdf06_0203_page0203.jpeg', 'pdf06_0203_page0405.jpeg',  'pdf06_040506070809.jpeg',  'pdf06_101112.jpeg',  'pdf06_131415.jpeg',  'pdf06_1617_page1819.jpeg',  'pdf06_1617_page20212223.jpeg', 'pdf06_181920_page242528.jpeg', 'pdf06_181920_page262729.jpeg',  'pdf06_21_page303132.jpeg', 'pdf06_2223_page33343536.jpeg',  'pdf06_2425.jpeg',  'pdf06_262728.jpeg',  'pdf06_293031.jpeg',  'pdf06_3233_page454647.jpeg',  'pdf06_33_page48.jpeg',  'pdf06_343536.jpeg',  'pdf06_373839.jpeg',  'pdf06_4041_page5556.jpeg', 'pdf06_4041_page5758.jpeg',  'pdf06_4041_page59.jpeg', 'pdf06_4041_page60.jpeg', 'pdf06_4243444546.jpeg',  'pdf06_4748495051.jpeg',  'pdf06_5253.jpeg',  'pdf06_5455.jpeg',  'pdf06_5657585960.jpeg',  'pdf06_6162636465.jpeg',  'pdf06_666768.jpeg',  'pdf06_697071.jpeg',  'pdf06_727374.jpeg',  'pdf06_75.jpeg', 'pdf06_7677.jpeg',  'pdf06_787980.jpeg',  'pdf07_01_page0102.jpeg',  'pdf07_0203_page0304050607080910.jpeg', 'pdf07_0405_page11121314.jpeg',  'pdf07_06070809.jpeg',  'pdf07_1011.jpeg'];

/*農業9*/
const industryAgriculture = ['pdf07_44_page21.jpeg',  'pdf07_4445_page2223.jpeg',  'pdf07_4445_page2425.jpeg',  'pdf07_46.jpeg', 'pdf07_47.jpeg', 'pdf07_4849.jpeg',  'pdf07_5051.jpeg',  'pdf07_52.jpeg', 'pdf07_53.jpeg'];
/*漁業21*/
const industryFishing = ['pdf07_5455.jpeg', 'pdf07_5657.jpeg', 'pdf07_5859_page383940.jpeg', 'pdf07_606162.jpeg',  'pdf07_636465.jpeg', 'pdf07_666768.jpeg',  'pdf07_697071.jpeg',  'pdf07_72737475.jpeg', 'pdf07_76777879.jpeg',  'pdf07_80010203.jpeg',  'pdf08_04050607.jpeg',  'pdf08_08091011.jpeg',  'pdf08_12131415.jpeg',  'pdf08_16.jpeg', 'pdf08_17.jpeg', 'pdf08_18192021.jpeg',  'pdf08_22232425.jpeg', 'pdf08_26.jpeg', 'pdf08_27.jpeg', 'pdf08_28.jpeg', 'pdf08_29.jpeg'];
/*露領漁業112*/
const industryRussianFishery = ['pdf08_54.jpeg', 'pdf08_55.jpeg', 'pdf08_56.jpeg', 'pdf08_57.jpeg', 'pdf08_58.jpeg', 'pdf08_59.jpeg', 'pdf08_60.jpeg', 'pdf08_6162_page4041.jpeg', 'pdf08_62_page42.jpeg', 'pdf08_63.jpeg', 'pdf08_64.jpeg', 'pdf08_65_page45.jpeg', 'pdf08_65_page46.jpeg',  'pdf08_6667.jpeg',  'pdf08_72.jpeg', 'pdf08_73.jpeg', 'pdf08_74.jpeg', 'pdf08_75.jpeg', 'pdf08_76.jpeg', 'pdf08_77.jpeg', 'pdf08_7879.jpeg', 'pdf08_80.jpeg', 'pdf09_01.jpeg', 'pdf09_02.jpeg', 'pdf09_03.jpeg', 'pdf09_04.jpeg', 'pdf09_05.jpeg', 'pdf09_06.jpeg', 'pdf09_07.jpeg', 'pdf09_08.jpeg', 'pdf09_09.jpeg', 'pdf09_10.jpeg', 'pdf09_11.jpeg', 'pdf09_12.jpeg', 'pdf09_13.jpeg', 'pdf09_14.jpeg', 'pdf09_15.jpeg', 'pdf09_16.jpeg', 'pdf09_17.jpeg', 'pdf09_18.jpeg', 'pdf09_19.jpeg', 'pdf09_20.jpeg', 'pdf09_21.jpeg', 'pdf09_22.jpeg', 'pdf09_23.jpeg', 'pdf09_24.jpeg', 'pdf09_26.jpeg', 'pdf09_27.jpeg', 'pdf09_28.jpeg', 'pdf09_29.jpeg', 'pdf09_30.jpeg',  'pdf09_31.jpeg', 'pdf09_32.jpeg', 'pdf09_33.jpeg', 'pdf09_34.jpeg', 'pdf09_35.jpeg', 'pdf09_36.jpeg', 'pdf09_37.jpeg', 'pdf09_38.jpeg', 'pdf09_39.jpeg', 'pdf09_40.jpeg', 'pdf09_41.jpeg', 'pdf09_42.jpeg', 'pdf09_43.jpeg', 'pdf09_44.jpeg', 'pdf09_45.jpeg', 'pdf09_46.jpeg', 'pdf09_47.jpeg', 'pdf09_48.jpeg', 'pdf09_49.jpeg', 'pdf09_50.jpeg', 'pdf09_51.jpeg', 'pdf09_52.jpeg', 'pdf09_53.jpeg', 'pdf09_54.jpeg', 'pdf09_55.jpeg', 'pdf09_56.jpeg', 'pdf09_57.jpeg', 'pdf09_58.jpeg', 'pdf09_59.jpeg', 'pdf09_60.jpeg', 'pdf09_61.jpeg', 'pdf09_62.jpeg', 'pdf09_63.jpeg', 'pdf09_64.jpeg', 'pdf09_65.jpeg', 'pdf09_66.jpeg', 'pdf09_67.jpeg', 'pdf09_68.jpeg', 'pdf09_69.jpeg', 'pdf09_70.jpeg', 'pdf09_71.jpeg', 'pdf09_72.jpeg', 'pdf09_73.jpeg', 'pdf09_74.jpeg', 'pdf09_75.jpeg', 'pdf09_76.jpeg', 'pdf09_77.jpeg', 'pdf09_78.jpeg', 'pdf09_79.jpeg', 'pdf09_80.jpeg', 'pdf10_01.jpeg', 'pdf10_02.jpeg', 'pdf10_03.jpeg', 'pdf10_04.jpeg', 'pdf10_05.jpeg', 'pdf10_06.jpeg', 'pdf10_07.jpeg', 'pdf10_08.jpeg', 'pdf10_09.jpeg', 'pdf10_10.jpeg', 'pdf10_11.jpeg'];
/*工業1*/
const industryIndustry = ['Mix_pdf10_121314151617.jpeg'];
/*事業所〇
const industryEstablishments = ['pdf10_18.jpeg', 'pdf10_19.jpeg', 'pdf10_20.jpeg', 'pdf10_21.jpeg'];*/
/*金融11*/
const industryCommercial = [ 'pdf10_25.jpeg', 'pdf10_2627_page1920.jpeg', 'pdf10_2627_page2122.jpeg', 'pdf10_26272829_page23242526.jpeg',  'pdf10_3031_page2728.jpeg', 'pdf10_3031_page2930.jpeg', 'pdf10_323334.jpeg',  'pdf10_35.jpeg', 'pdf10_36_page37.jpeg', 'pdf10_3637_page3839.jpeg'];
/*運輸21*/
const industryTransportation = ['pdf10_38.jpeg', 'pdf10_39.jpeg', 'pdf10_40.jpeg', 'pdf10_41.jpeg', 'pdf10_42.jpeg', 'pdf10_43.jpeg', 'pdf10_44.jpeg', 'pdf10_45.jpeg', 'pdf10_46_page48.jpeg', 'pdf10_4647_page4950.jpeg', 'pdf10_47_page51.jpeg',  'pdf10_48_page52.jpeg',  'pdf10_4849_page5354.jpeg',  'pdf10_5859.jpeg',  'pdf10_60.jpeg', 'pdf10_61_page5859.jpeg', 'pdf10_62.jpeg', 'pdf10_63.jpeg', 'pdf10_64.jpeg', 'pdf10_65_page63.jpeg', 'pdf10_65_page64.jpeg'];
/*内国貿易69*/
const industryDomesticTrade = ['pdf10_666768.jpeg',  'pdf10_697071.jpeg',  'pdf10_727374.jpeg', 'pdf10_757677.jpeg', 'pdf10_78798001.jpeg',   'pdf11_020304.jpeg',  'pdf11_050607.jpeg',  'pdf11_08091011.jpeg', 'pdf11_12131415.jpeg', 'pdf11_16171819.jpeg', 'pdf11_202122.jpeg', 'pdf11_232425.jpeg',  'pdf11_262728.jpeg', 'pdf11_293031.jpeg', 'pdf11_32333435.jpeg', 'pdf11_363738.jpeg', 'pdf11_394041.jpeg', 'pdf11_42434445.jpeg', 'pdf11_46474849.jpeg', 'pdf11_50515253.jpeg', 'pdf11_5455565758.jpeg', 'pdf11_5960616263.jpeg', 'pdf11_6465666.jpeg', 'pdf11_676869.jpeg', 'pdf11_70717273.jpeg', 'pdf11_74757677.jpeg', 'pdf11_78798001.jpeg',  'pdf12_0203040506.jpeg',  'pdf12_0708091011.jpeg', 'pdf12_121314.jpeg', 'pdf12_151617.jpeg', 'pdf12_18192021.jpeg', 'pdf12_22232425.jpeg', 'pdf12_26272829.jpeg', 'pdf12_30313233.jpeg', 'pdf12_34353637.jpeg', 'pdf12_38394041.jpeg', 'pdf12_42434445.jpeg', 'pdf12_46474849.jpeg', 'pdf12_50515253.jpeg', 'pdf12_54555657.jpeg', 'pdf12_58596061.jpeg', 'pdf12_62636465.jpeg',  'pdf12_66676869.jpeg', 'pdf12_7071.jpeg', 'pdf12_7273.jpeg', 'pdf12_7475.jpeg', 'pdf12_7677.jpeg', 'pdf12_7879.jpeg', 'pdf12_8001.jpeg', 'pdf13_0203.jpeg', 'pdf13_0405.jpeg',  'pdf13_0607.jpeg', 'pdf13_0809.jpeg', 'pdf13_1011.jpeg', 'pdf13_1213.jpeg', 'pdf13_1415.jpeg', 'pdf13_1617.jpeg', 'pdf13_1819.jpeg', 'pdf13_2021.jpeg', 'pdf13_2223.jpeg', 'pdf13_2425.jpeg', 'pdf13_2627.jpeg', 'pdf13_2829.jpeg', 'pdf13_3031.jpeg', 'pdf13_3233.jpeg', 'pdf13_3435.jpeg', 'pdf13_3637.jpeg', 'pdf13_3839.jpeg'];
/*外国貿易55*/
const industryForeignTrade = ['pdf13_40414243.jpeg', 'pdf13_44454647.jpeg', 'pdf13_48495051.jpeg', 'pdf13_52535455.jpeg', 'pdf13_5657585960616263.jpeg',  'pdf13_6465666768697071.jpeg', 'pdf13_7273.jpeg', 'pdf13_7475.jpeg', 'pdf13_7677.jpeg', 'pdf13_7879.jpeg', 'pdf13_8001.jpeg',  'pdf14_0203.jpeg', 'pdf14_0405.jpeg', 'pdf14_0607.jpeg', 'pdf14_0809.jpeg', 'pdf14_10111213.jpeg', 'pdf14_141516171819.jpeg', 'pdf14_2021.jpeg', 'pdf14_2223.jpeg', 'pdf14_2425.jpeg', 'pdf14_26272829.jpeg', 'pdf14_30313233.jpeg', 'pdf14_34353637.jpeg', 'pdf14_383940414243.jpeg',  'pdf14_4445.jpeg', 'pdf14_4647.jpeg', 'pdf14_4849.jpeg', 'pdf14_5051.jpeg', 'pdf14_5253.jpeg', 'pdf14_5455.jpeg',  'pdf14_5657.jpeg', 'pdf14_58596061.jpeg', 'pdf14_62636465.jpeg', 'pdf14_6667.jpeg', 'pdf14_6869.jpeg', 'pdf14_7071_page69707172.jpeg', 'pdf14_7273.jpeg', 'pdf14_7475.jpeg', 'pdf14_7677.jpeg', 'pdf14_7879.jpeg', 'pdf14_8001.jpeg',  'pdf15_0203.jpeg', 'pdf15_0405_page5_6_7_8_9_10.jpeg', 'pdf15_0607.jpeg', 'pdf15_0809.jpeg', 'pdf15_1011.jpeg', 'pdf15_12131415_page17_18_19_20_21_22_23_24.jpeg', 'pdf15_1617.jpeg', 'pdf15_18.jpeg', 'pdf15_19.jpeg', 'pdf15_20212223_page29_30_31_32_33_34_35.jpeg', 'pdf15_2425.jpeg', 'pdf15_26.jpeg', 'pdf15_27.jpeg'];
/*物価31*/
const industryPrices = ['pdf15_28.jpeg', 'pdf15_29.jpeg', 'pdf15_3031.jpeg', 'pdf15_3233.jpeg', 'pdf15_3435.jpeg', 'pdf15_3637.jpeg', 'pdf15_3839.jpeg', 'pdf15_4041.jpeg',  'pdf15_4243.jpeg', 'pdf15_4445.jpeg', 'pdf15_4647.jpeg', 'pdf15_4849.jpeg', 'pdf15_5051.jpeg',  'pdf15_5253.jpeg', 'pdf15_5455.jpeg', 'pdf15_5657.jpeg', 'pdf15_5859.jpeg', 'pdf15_6061.jpeg',  'pdf15_6263.jpeg', 'pdf15_6465.jpeg', 'pdf15_6667.jpeg', 'pdf15_6869.jpeg', 'pdf15_7071.jpeg', 'pdf15_7273.jpeg', 'pdf15_7475.jpeg', 'pdf15_7677.jpeg', 'pdf15_7879.jpeg', 'pdf16_8001.jpeg',  'pdf16_0203.jpeg', 'pdf16_04050607.jpeg', 'pdf16_08091011.jpeg'];

/*司法10*/
const societyJudiciary = ['pdf16_1415_page1213.jpeg', 'pdf16_1415_page1415.jpeg', 'pdf16_1617_page1617.jpeg', 'pdf16_1617_page1819.jpeg', 'pdf16_1617_page2021.jpeg', 'pdf16_161718_page22.jpeg', 'pdf16_192021.jpeg',  'pdf16_22.jpeg', 'pdf16_23.jpeg'];
/*風俗3*/
const societyPublicMorals = ['pdf16_24.jpeg', 'pdf16_25.jpeg', 'pdf16_2627.jpeg'];
/*消防6*/
const societyFirefighting = ['pdf16_28.jpeg', 'pdf16_29.jpeg', 'pdf16_30_page34.jpeg', 'pdf16_3031_page3536.jpeg', 'pdf16_3233.jpeg', 'pdf16_3435.jpeg'];
/*衛星13*/
const societySatellite = ['pdf16_36.jpeg', 'pdf16_37.jpeg', 'pdf16_38394041.jpeg',  'pdf16_42.jpeg', 'pdf16_4344_page4849.jpeg', 'pdf16_44_page50.jpeg', 'pdf16_45_page5152.jpeg', 'pdf16_464748.jpeg', 'pdf16_495051_page565859.jpeg', 'pdf16_495051_page576061.jpeg', 'pdf16_52_page62.jpeg', 'pdf16_525354_page63646566.jpeg', 'pdf16_54_page67.jpeg'];
/*水道5*/
const societyWater = ['pdf16_56_page68.jpeg', 'pdf16_56_page69.jpeg', 'pdf16_57.jpeg', 'pdf16_5859.jpeg', 'pdf16_6061.jpeg'];
/*教育56*/
const societyEducation = ['pdf16_6263.jpeg', 'pdf16_6465_page7778.jpeg', 'pdf16_6465_page79.jpeg', 'pdf16_70.jpeg', 'pdf16_71_page85.jpeg', 'pdf16_71_page86.jpeg', 'pdf16_71_page87.jpeg', 'pdf16_71_page88.jpeg', 'pdf16_71_page89.jpeg', 'pdf16_71_page90.jpeg', 'pdf16_7273.jpeg', 'pdf16_7475.jpeg', 'pdf16_7677.jpeg', 'pdf16_7879.jpeg', 'pdf16_80.jpeg',  'pdf17_01.jpeg', 'pdf17_02_page2.jpeg', 'pdf17_03.jpeg', 'pdf17_04_page4.jpeg', 'pdf17_04_page5.jpeg', 'pdf17_05.jpeg', 'pdf17_11.jpeg', 'pdf17_12.jpeg', 'pdf17_13.jpeg', 'pdf17_14.jpeg', 'pdf17_15.jpeg', 'pdf17_21_page31.jpeg', 'pdf17_21_page32.jpeg', 'pdf17_22_page33.jpeg', 'pdf17_22_page34.jpeg', 'pdf17_23_page35.jpeg', 'pdf17_23_page36.jpeg', 'pdf17_2425_page37.jpeg', 'pdf17_2425_page38.jpeg', 'pdf17_2425_page3940.jpeg', 'pdf17_31_page51.jpeg', 'pdf17_31_page52.jpeg', 'pdf17_31_page53.jpeg', 'pdf17_31_page54.jpeg', 'pdf17_31_page55.jpeg', 'pdf17_32_page56.jpeg', 'pdf17_32_page57.jpeg', 'pdf17_33_page58.jpeg', 'pdf17_33_page59.jpeg', 'pdf17_33_page60.jpeg', 'pdf17_3435.jpeg', 'pdf17_41.jpeg', 'pdf17_42_page70.jpeg', 'pdf17_42_page71.jpeg', 'pdf17_42_page72.jpeg', 'pdf17_43_page73.jpeg', 'pdf17_43_page74.jpeg', 'pdf17_4445_page7576.jpeg', 'pdf17_4445_page77.jpeg'];
/*兵事1*/
const societyMilitary = ['pdf17_4647.jpeg'];

/*csvファイル*/

/*気象*/
const adminWeather_csv = ['Mix_Pdf3_Page1and2_new.csv', 'Mix_Pdf3_Page3and4_new.csv', 'Mix_Pdf3_Page5and6_new.csv'];
/*土地*/
const adminLand_csv = ['Mix_Pdf3_Page7and8_new.csv',  'Mix_Pdf3_Page9and10_new.csv',  'Mix_Pdf3_Page11and12_new.csv',  'Pdf3_Page13.csv', 'Pdf3_Page14.csv',  'Pdf3_Page15.csv'];
/*人口*/
const adminPopulation_csv = [ 'Mix_Pdf3_Page16and17.csv',  'Mix_Pdf3_Page18and19.csv', 'Mix_Pdf3_Page20and21.csv',  'Mix_Pdf3_Page22and23.csv',  'Mix_Pdf3_Page24and25.csv',  'Mix_Pdf3_Page26and27.csv',  'Mix_Pdf3_Page28and29.csv',  'Mix_Pdf3_Page30_31_32_33.csv',  'Mix_Pdf3_Page34and35.csv',  'Mix_Pdf3_Page36and37.csv',  'Mix_Pdf3_Page38and39.csv',  'Mix_Pdf3_Page40and41.csv',  'Mix_Pdf3_Page42and43.csv',  'Mix_Pdf3_Page44and45.csv',  'Mix_Pdf3_Page46and47.csv',  'Mix_Pdf3_Page48and49.csv',  'Mix_Pdf3_Page50and51.csv',  'Pdf3_Page52_new.csv', 'Pdf3_Page53.csv'];
/*財政〇*/
const adminFinance_csv = ['Mix_Pdf3_Page54and55.csv', 'Mix_Pdf3_Page56and57.csv', 'Mix_Pdf3_4_Page58_59_1_2_3.csv',  'Mix_Pdf4_Page4_5_6_7_8.csv',  'Mix_Pdf4_Page9_10_11_12.csv',  'Mix_Pdf4_Page13_14_15_16.csv',  'Mix_Pdf4_Page17_18_19_20_21_22_23_24.csv',  'Mix_Pdf4_Page25_26_27_28.csv', 'Mix_Pdf4_Page29_30_31_32.csv',  'Mix_Pdf4_Page33and34.csv', 'Mix_Pdf4_Page35and36.csv', 'Mix_Pdf4_Page37and38.csv', 'Mix_Pdf4_Page39_40_41.csv',  'Mix_Pdf4_Page42_43_44.csv',  'Mix_Pdf4_Page45_46_47.csv',  'Mix_Pdf4_Page48_49_50.csv',  'Mix_Pdf4_Page51_52_53.csv', 'Mix_Pdf4_Page54_55_56.csv',  'Mix_Pdf4_Page57_58_59.csv', 'Mix_Pdf4_Page60_61_62.csv',  'Mix_Pdf4_Page63_64_65.csv',  'Mix_Pdf4_Page66_67_68.csv',  'Mix_Pdf4_Page69_70_71.csv',  'Mix_Pdf4_Page72_73_74.csv',  'Mix_Pdf4_Page75_76_77.csv',  'Mix_Pdf4_Page78_79_80.csv',  'Mix_Pdf5_Page1and2.csv',  'Mix_Pdf5_Page3and4.csv',  'Mix_Pdf5_Page5and6.csv',  'Mix_Pdf5_Page7and8.csv',  'Mix_Pdf5_Page9and10.csv',  'Mix_Pdf5_Page11and12.csv',  'Mix_Pdf5_Page13and14.csv',  'Mix_Pdf5_Page15_16_17.csv',  'Mix_Pdf5_Page18_19_20.csv',  'Mix_Pdf5_Page21_22_23.csv',  'Mix_Pdf5_Page24_25_26.csv',  'Mix_Pdf5_Page27_28_29.csv',  'Mix_Pdf5_Page30_31_32.csv',  'Mix_Pdf5_Page33_34_35.csv',  'Mix_Pdf5_Page36_37_38.csv',  'Mix_Pdf5_Page39_40_41.csv',  'Mix_Pdf5_Page42_43_44.csv',  'Pdf5_Page45.csv',  'Pdf5_Page46.csv',  'Pdf5_Page47.csv',  'Pdf5_Page48.csv',  'Pdf5_Page49.csv',  'Pdf5_Page50.csv',  'Pdf5_Page51.csv',  'Pdf5_Page52.csv',  'Pdf5_Page53.csv',  'Pdf5_Page54.csv',  'Pdf5_Page55.csv',  'Pdf5_Page56.csv',  'Mix_Pdf5_Page57and58.csv', 'Mix_Pdf5_Page59and60.csv',  'Mix_Pdf5_Page61and62.csv',  'Mix_Pdf5_Page63and64.csv',  'Mix_Pdf5_Page65and66.csv', 'Mix_Pdf5_Page67_68_69.csv',  'Pdf5_Page70.csv',  'Mix_Pdf5_Page71and72.csv',  'Pdf5_Page73.csv',  'Pdf5_Page74.csv',  'Pdf5_Page75.csv',  'Pdf5_Page76.csv',  'Pdf5_Page77.csv',  'Pdf5_Page78.csv',  'Pdf5_Page79.csv',  'Pdf5_Page80.csv',  'Mix_Pdf5_Page81and82.csv', 'Mix_Pdf5_Page83and84.csv', 'Mix_Pdf5_Page85and86.csv', 'Mix_Pdf5_Page87_88_89_90.csv',  'Pdf5_Page91.csv',  'Pdf5_Page92.csv',  'Pdf5_Page93.csv',  'Mix_Pdf5_Page94_95_96_97.csv',  'Mix_Pdf5_Page98_99_104_105.csv',  'Mix_Pdf5_Page100_101_106_107.csv',  'Mix_Pdf5_Page102and103.csv', 'Mix_Pdf5_Page108_109_114.csv',  'Mix_Pdf5_Page110_111_115.csv',  'Mix_Pdf5_Page112and113.csv',  'Pdf5_Page116.csv',  'Mix_Pdf5_Page117_118_119.csv',  'Pdf5_Page120.csv',  'Pdf5_Page121.csv',  'Pdf6_Page1.csv', 'Mix_Pdf6_Page2and3.csv',  'Mix_Pdf6_Page4and5.csv',  'Mix_Pdf6_Page6_7_8_9_10_11.csv',  'Mix_Pdf6_Page12_13_14.csv',  'Mix_Pdf6_Page15_16_17.csv',  'Mix_Pdf6_Page18and19.csv',  'Mix_pdf6_page20_21_22_23.csv',   'Mix_pdf6_page24_25_28.csv',  'Mix_pdf6_page26_27_29.csv',  'Mix_pdf6_page30_31_32.csv',  'Mix_pdf6_page33_34_35_36.csv',  'Mix_pdf6_page37and38.csv',  'Mix_pdf6_page39_40_41.csv', 'Mix_pdf6_page42_43_44.csv',  'Mix_pdf6_page45_46_47.csv',   'Pdf6_Page48.csv', 'Mix_pdf6_page49_50_51.csv',  'Mix_pdf6_page52_53_54.csv',  'Mix_pdf6_Page55and56.csv',  'Mix_pdf6_page57and58.csv',  'Pdf6_Page59.csv', 'Pdf6_Page60.csv', 'Mix_pdf6_page61_62_63_64_65.csv',  'Mix_pdf6_page66_67_68_69_70.csv',  'Mix_pdf6_page71and72.csv',  'Mix_pdf6_page73and74.csv',  'Mix_pdf6_page75_76_77_78_79.csv',  'Mix_pdf6_page80_81_82_83_84.csv',  'Mix_pdf6_page85_86_87.csv',  'Mix_pdf6_page88_89_90.csv',  'Mix_pdf6_page91_92_93.csv',  'Pdf6_Page94.csv', 'Mix_pdf6_page95and96.csv',  'Mix_pdf6_page97_98_99.csv',  'Mix_pdf7_page1andpage2.csv',  'Mix_pdf7_page3_4_5_6_7_8_9_10.csv',  'Mix_pdf7_page11_12_13_14.csv',  'Mix_pdf7_page15_16_17_18.csv',  'Mix_pdf7_page19and20.csv'];


/*農業*/
const industryAgriculture_csv = ['Pdf7_Page21.csv', 'Mix_pdf7_page22and23.csv',  'Mix_pdf7_page24and25.csv',  'Pdf7_Page26.csv', 'Pdf7_Page27.csv', 'Mix_pdf7_page28and29.csv',  'Mix_pdf7_page30and31.csv',  'Pdf7_Page32.csv', 'Pdf7_Page33.csv'];
/*漁業*/
const industryFishing_csv = ['Mix_Pdf7_Page34and35.csv',  'Mix_Pdf7_Page36and37.csv', 'Mix_Pdf7_Page38_39_40.csv', 'Mix_Pdf7_Page41_42_43.csv',  'Mix_Pdf7_Page44_45_46.csv',   'Mix_Pdf7_Page47_48_49.csv',  'Mix_Pdf7_Page50_51_52.csv',  'Mix_Pdf7_Page53_54_55_56.csv',  'Mix_Pdf7_Page57_58_59_60.csv', 'Mix_Pdf8_page1_2_3_4.csv',  'Mix_Pdf8_page5_6_7_8.csv',  'Mix_Pdf8_page9_10_11_12.csv',  'Mix_Pdf8_page13_14_15_16.csv',  'Pdf8_page17.csv',  'Pdf8_page18.csv',  'Mix_Pdf8_page19_20_21_22.csv',  'Mix_Pdf8_page23_24_25_26.csv',  'Pdf8_page27.csv',  'Pdf8_page28.csv',  'Pdf8_page29.csv',  'Pdf8_page30.csv'];
/*露領漁業*/
const industryRussianFishery_csv =['Pdf8_Page33.csv', 'Pdf8_Page34.csv', 'Pdf8_Page35.csv', 'Pdf8_Page36.csv', 'Pdf8_Page37.csv', 'Pdf8_Page38.csv', 'Pdf8_Page39.csv', 'Mix_Pdf8_Page40and41.csv',  'Pdf8_Page42.csv', 'Pdf8_Page43.csv', 'Pdf8_Page44.csv', 'Pdf8_Page45.csv', 'Pdf8_Page46.csv', 'Mix_Pdf8_Page47and48.csv',  'Pdf8_Page49.csv', 'Pdf8_Page50.csv', 'Pdf8_Page51.csv', 'Pdf8_Page52.csv', 'Pdf8_Page53.csv', 'Pdf8_Page54.csv', 'Mix_Pdf8_Page55and56.csv',  'Pdf8_Page57.csv', 'Pdf9_Page1.csv', 'Pdf9_Page2.csv', 'Pdf9_Page3.csv', 'Pdf9_Page4.csv', 'Pdf9_Page5.csv', 'Pdf9_Page6.csv', 'Pdf9_Page7.csv', 'Pdf9_Page8.csv', 'Pdf9_Page9.csv', 'Pdf9_Page10.csv', 'Pdf9_Page11.csv', 'Pdf9_Page12.csv', 'Pdf9_Page13.csv', 'Pdf9_Page14.csv', 'Pdf9_Page15.csv', 'Pdf9_Page16.csv', 'Pdf9_Page17.csv', 'Pdf9_Page18.csv', 'Pdf9_Page19.csv', 'Pdf9_Page20.csv', 'Pdf9_Page21.csv', 'Pdf9_Page22.csv', 'Pdf9_Page23.csv', 'Pdf9_Page24.csv', 'Pdf9_Page25.csv', 'Pdf9_Page26.csv', 'Pdf9_Page27.csv', 'Pdf9_Page28.csv', 'Pdf9_Page29.csv', 'Pdf9_Page30.csv', 'Pdf9_Page31.csv', 'Pdf9_Page32.csv', 'Pdf9_Page33.csv', 'Pdf9_Page34.csv', 'Pdf9_Page35.csv', 'Pdf9_Page36.csv', 'Pdf9_Page37.csv', 'Pdf9_Page38.csv', 'Pdf9_Page39.csv', 'Pdf9_Page40.csv', 'Pdf9_Page41.csv', 'Pdf9_Page42.csv', 'Pdf9_Page43.csv', 'Pdf9_Page44.csv', 'Pdf9_Page45.csv', 'Pdf9_Page46.csv', 'Pdf9_Page47.csv', 'Pdf9_Page48.csv', 'Pdf9_Page49.csv', 'Pdf9_Page50.csv', 'Pdf9_Page51.csv', 'Pdf9_Page52.csv', 'Pdf9_Page53.csv', 'Pdf9_Page54.csv', 'Pdf9_Page55.csv', 'Pdf9_Page56.csv', 'Pdf9_Page57.csv', 'Pdf9_Page58.csv', 'Pdf9_Page59.csv', 'Pdf9_Page60.csv', 'Pdf9_Page61.csv', 'Pdf9_Page62.csv', 'Pdf9_Page63.csv', 'Pdf9_Page64.csv', 'Pdf9_Page65.csv', 'Pdf9_Page66.csv', 'Pdf9_Page67.csv', 'Pdf9_Page68.csv', 'Pdf9_Page69.csv', 'Pdf9_Page70.csv', 'Pdf9_Page71.csv', 'Pdf9_Page72.csv', 'Pdf9_Page73.csv', 'Pdf9_Page74.csv', 'Pdf9_Page75.csv', 'Pdf9_Page76.csv', 'Pdf9_Page77.csv', 'Pdf9_Page78.csv', 'Pdf9_Page79.csv', 'Pdf9_Page80.csv',  'Pdf10_Page1.csv',  'Pdf10_Page2.csv',  'Pdf10_Page3.csv',  'Pdf10_Page4.csv',  'Pdf10_Page5.csv',  'Pdf10_Page6.csv',  'Pdf10_Page7.csv',  'Pdf10_Page8.csv',  'Pdf10_Page9.csv',  'Pdf10_Page10.csv',  'Pdf10_Page11.csv' ]
/*工業*/
const industryIndustry_csv =['Mix_pdf10_page12_13_14_15_16_17.csv']
/*事業所〇
const industryEstablishments_csv =[]*/
/*金融*/
const industryCommercial_csv = ['Mix_Pdf10_Page19and20.csv',  'Mix_Pdf10_Page21and22.csv',  'Mix_Pdf10_Page23_24_25_26.csv',  'Mix_Pdf10_Page27and28.csv',  'Mix_Pdf10_Page29and30.csv',  'Mix_Pdf10_Page31and32.csv',  'Mix_Pdf10_Page33_34_35.csv',  'Pdf10_Page36.csv',  'Pdf10_Page37.csv',  'Mix_Pdf10_page38and39.csv']
/*運輸*/
const industryTransportation_csv = ['Pdf10_Page40.csv',  'Pdf10_Page41.csv',  'Pdf10_Page42.csv',  'Pdf10_Page43.csv',  'Pdf10_Page44.csv',  'Pdf10_Page45.csv',  'Pdf10_Page46.csv',  'Pdf10_Page47.csv',  'Pdf10_Page48.csv',  'Mix_Pdf10_Page49and50.csv',  'Pdf10_Page51.csv',  'Pdf10_Page52.csv',  'Mix_Pdf10_Page53and54.csv',  'Mix_Pdf10_Page55and56.csv',  'Pdf10_Page57.csv',  'Mix_Pdf10_Page58and59.csv',  'Pdf10_Page60.csv',  'Pdf10_Page61.csv',  'Pdf10_Page62.csv',  'Pdf10_Page63.csv',  'Pdf10_Page64.csv',  ]
/*内国貿易*/
const industryDomesticTrade_csv = ['Mix_pdf10_page65_66_67.csv',  'Mix_pdf10_page68_69_70.csv',  'Mix_pdf10_page71_72_73.csv',  'Mix_pdf10_page74_75_76.csv',  'Mix_pdf10_page77_78_79_80.csv',  'Mix_pdf11_page1_2_3.csv',  'Mix_pdf11_page4_5_6.csv',  'Mix_pdf11_page7_8_9_10.csv',  'Mix_pdf11_page11_12_13_14.csv',  'Mix_pdf11_page15_16_17_18.csv',  'Mix_pdf11_page19_20_21.csv',  'Mix_pdf11_page22_23_24.csv',  'Mix_pdf11_page25_26_27.csv',  'Mix_pdf11_page28_29_30.csv',  'Mix_pdf11_page31_32_33_34.csv',  'Mix_pdf11_page35_36_37.csv',  'Mix_pdf11_page38_39_40.csv',  'Mix_pdf11_page41_42_43_44.csv',  'Mix_pdf11_page45_46_47_48.csv',  'Mix_pdf11_page49_50_51_52.csv',  'Mix_pdf11_page53_54_55_56_57.csv',  'Mix_pdf11_page58_59_60_61_62.csv',  'Mix_pdf11_page63_64_65.csv',  'Mix_pdf11_page66_67_68.csv',  'Mix_pdf11_page69_70_71_72.csv',  'Mix_pdf11_page73_74_75_76.csv',  'Mix_pdf11_page77_78_79_80.csv',  'Mix_pdf12_page1_2_3_4_5.csv',  'Mix_pdf12_page6_7_8_9_10.csv',  'Mix_pdf12_page11_12_13.csv',  'Mix_pdf12_page14_15_16.csv',  'Mix_pdf12_page17_18_19_20.csv',  'Mix_pdf12_page21_22_23_24.csv',  'Mix_pdf12_page25_26_27_28.csv',  'Mix_pdf12_page29_30_31_32.csv',  'Mix_pdf12_page33_34_35_36.csv',  'Mix_pdf12_page37_38_39_40.csv',  'Mix_pdf12_page41_42_43_44.csv',  'Mix_pdf12_page45_46_47_48.csv',  'Mix_pdf12_page49_50_51_52.csv',  'Mix_pdf12_page53_54_55_56.csv',  'Mix_pdf12_page57_58_59_60.csv',  'Mix_pdf12_page61_62_63_64.csv',  'Mix_pdf12_page65_66_67_68.csv',  'Mix_pdf12_page69and70.csv',  'Mix_pdf12_page71and72.csv',  'Mix_pdf12_page73and74.csv',  'Mix_pdf12_page75and76.csv',  'Mix_pdf12_page77and78.csv',  'Mix_pdf12_page79and80.csv',  'Mix_pdf13_page1and2.csv',  'Mix_pdf13_page3and4.csv',  'Mix_pdf13_page5and6.csv',  'Mix_pdf13_page7and8.csv',  'Mix_pdf13_page9and10.csv',  'Mix_pdf13_page11and12.csv',  'Mix_pdf13_page13and14.csv',  'Mix_pdf13_page15and16.csv',  'Mix_pdf13_page17and18.csv',  'Mix_pdf13_page19and20.csv',  'Mix_pdf13_page21and22.csv',  'Mix_pdf13_page23and24.csv',  'Mix_pdf13_page25and26.csv',  'Mix_pdf13_page27and28.csv',  'Mix_pdf13_page29and30.csv',  'Mix_pdf13_page31and32.csv',  'Mix_pdf13_page33and34.csv',  'Mix_pdf13_page35and36.csv',  'Mix_pdf13_page37and38.csv']
/*外国貿易*/
const industryForeignTrade_csv = ['Mix_Pdf13_Page39_40_41_42.csv', 'Mix_Pdf13_Page43_44_45_46.csv', 'Mix_Pdf13_Page47_48_49_50.csv', 'Mix_Pdf13_Page51_52_53_54.csv', 'Mix_Pdf13_Page55_56_57_58_59_60_61_62.csv', 'Mix_Pdf13_Page63_64_65_66_67_68_69_70.csv', 'Mix_Pdf13_Page71and72.csv', 'Mix_Pdf13_Page73and74.csv', 'Mix_Pdf13_Page75and76.csv', 'Mix_Pdf13_Page77and78.csv', 'Mix_Pdf13_Page79and80.csv', 'Mix_Pdf14_Page1and2.csv', 'Mix_Pdf14_Page3and4.csv', 'Mix_Pdf14_Page5and6.csv', 'Mix_Pdf14_Page7and8.csv', 'Mix_Pdf14_Page9_10_11_12.csv', 'Mix_Pdf14_Page13_14_15_16_17_18.csv', 'Mix_Pdf14_Page19and20.csv', 'Mix_Pdf14_Page21and22.csv', 'Mix_Pdf14_Page23and24.csv', 'Mix_Pdf14_Page25_26_27_28.csv', 'Mix_Pdf14_Page29_30_31_32.csv', 'Mix_Pdf14_Page33_34_35_36.csv', 'Mix_Pdf14_Page37_38_39_40_41_42.csv', 'Mix_Pdf14_Page43and44.csv', 'Mix_Pdf14_Page45and46.csv', 'Mix_Pdf14_Page47and48.csv', 'Mix_Pdf14_Page49and50.csv', 'Mix_Pdf14_Page51and52.csv', 'Mix_Pdf14_Page53and54.csv', 'Mix_Pdf14_Page55and56.csv', 'Mix_Pdf14_Page57_58_59_60.csv', 'Mix_Pdf14_Page61_62_63_64.csv', 'Mix_Pdf14_Page65and66.csv', 'Mix_Pdf14_Page67and68.csv', 'Mix_Pdf14_Page69_70_71_72.csv', 'Mix_Pdf14_Page73and74.csv', 'Mix_Pdf14_Page75and76.csv', 'Mix_Pdf14_Page77and78.csv', 'Mix_Pdf14_Page79and80.csv', 'Mix_Pdf15_Page1and2.csv', 'Mix_Pdf15_Page3and4.csv', 'Mix_Pdf15_Page5_6_7_8_9_10.csv', 'Mix_Pdf15_Page11and12.csv', 'Mix_Pdf15_Page13and14.csv', 'Mix_Pdf15_Page15and16.csv', 'Mix_Pdf15_Page17_18_19_20_21_22_23_24.csv', 'Mix_Pdf15_Page25and26.csv', 'Pdf15_Page27.csv', 'Pdf15_Page28.csv', 'Mix_Pdf15_Page29_30_31_32_33_34_35.csv', 'Mix_Pdf15_Page36and37.csv', 'Pdf15_Page38.csv', 'Pdf15_Page39.csv']
/*物価*/
const industryPrices_csv =['Pdf15_Page40.csv',  'Pdf15_Page41.csv',  'Mix_Pdf15_Page42and43.csv',  'Mix_Pdf15_Page44and45.csv',  'Mix_Pdf15_Page46and47.csv',  'Mix_Pdf15_Page48and49.csv',  'Mix_Pdf15_Page50and51.csv',  'Mix_Pdf15_Page52and53.csv',  'Mix_Pdf15_Page54and55.csv',  'Mix_Pdf15_Page56and57.csv',  'Mix_Pdf15_Page58and59.csv',  'Mix_Pdf15_Page60and61.csv',  'Mix_Pdf15_Page62and63.csv',  'Mix_Pdf15_Page64and65.csv',  'Mix_Pdf15_Page66and67.csv',  'Mix_Pdf15_Page68and69.csv',  'Mix_Pdf15_Page70and71.csv',  'Mix_Pdf15_Page72and73.csv',  'Mix_Pdf15_Page74and75.csv',  'Mix_Pdf15_Page76and77.csv',  'Mix_Pdf15_Page78and79.csv',  'Mix_Pdf15_Page80and81.csv',  'Mix_Pdf15_Page82and83.csv',  'Mix_Pdf15_Page84and85.csv',  'Mix_Pdf15_Page86and87.csv',  'Mix_Pdf15_Page88and89.csv',  'Mix_Pdf15_Page90and91.csv',  'Mix_Pdf15_Page92and1.csv',  'Mix_Pdf16_Page2and3.csv',  'Mix_Pdf16_Page4_5_6_7.csv',  'Mix_Pdf16_Page8_9_10_11.csv']

/*司法*/
const societyJudiciary_csv = ['Mix_pdf16_page12and13.csv',  'Mix_pdf16_page14and15.csv',  'Mix_pdf16_page16and17.csv',  'Mix_pdf16_page18and19.csv',  'Mix_pdf16_page20and21.csv',  'Pdf16_Page22.csv',  'Mix_pdf16_page23_24_25.csv',  'Pdf16_Page26.csv',  'Pdf16_Page27.csv']
/*風俗*/
const societyPublicMorals_csv = ['Pdf16_Page28.csv',  'Pdf16_Page29.csv',  'Mix_Pdf16_Page30and31.csv']
/*消防*/
const societyFirefighting_csv = ['Pdf16_Page32.csv',  'Pdf16_Page33.csv',  'Pdf16_Page34.csv',  'Mix_Pdf16_Page35and36.csv',  'Mix_Pdf16_Page37and38.csv',  'Mix_Pdf16_Page39and40.csv']
/*衛星*/
const societySatellite_csv = ['Pdf16_Page41.csv',   'Pdf16_Page42.csv',  'Mix_Pdf16_Page43_44_45_46.csv',  'Pdf16_Page47.csv',  'Mix_Pdf16_Page48and49.csv',  'Pdf16_Page50.csv',  'Mix_Pdf16_Page51and52.csv',  'Mix_Pdf16_Page53_54_55.csv',  'Mix_Pdf16_Page56_58_59.csv',  'Mix_Pdf16_Page57_60_61.csv',  'Pdf16_Page62.csv',  'Mix_Pdf16_Page63_64_65_66.csv',  'Pdf16_Page67.csv']
/*水道*/
const societyWater_csv = ['Pdf16_Page68.csv',  'Pdf16_Page69.csv',  'Pdf16_Page70.csv',  'Mix_Pdf16_Page71and72.csv',  'Mix_Pdf16_Page73and74.csv']
/*教育*/
const societyEducation_csv = ['Mix_Pdf16_Page75and76.csv', 'Mix_Pdf16_Page77and78.csv', 'Pdf16_Page79.csv', 'Mix_Pdf16_Page80and81.csv', 'Mix_Pdf16_Page82and83.csv', 'Pdf16_Page84.csv', 'Pdf16_Page85.csv', 'Pdf16_Page86.csv', 'Pdf16_Page87.csv', 'Pdf16_Page88.csv', 'Pdf16_Page89.csv', 'Pdf16_Page90.csv', 'Mix_Pdf16_Page91and92.csv', 'Mix_Pdf16_Page93and94.csv', 'Mix_Pdf16_Page95and96.csv', 'Mix_Pdf16_Page97and98.csv', 'Pdf16_Page99.csv', 'Pdf17_Page1.csv', 'Pdf17_Page2.csv', 'Pdf17_Page3.csv', 'Pdf17_Page4.csv', 'Pdf17_Page5.csv', 'Pdf17_Page6.csv', 'Pdf17_Page21.csv', 'Pdf17_Page22.csv', 'Pdf17_Page23.csv', 'Pdf17_Page24.csv', 'Pdf17_Page25.csv', 'Pdf17_Page31.csv', 'Pdf17_Page32.csv', 'Pdf17_Page33.csv', 'Pdf17_Page34.csv', 'Pdf17_Page35.csv', 'Pdf17_Page36.csv', 'Pdf17_Page37.csv', 'Pdf17_Page38.csv', 'Mix_Pdf17_Page39and40.csv', 'Pdf17_Page51.csv', 'Pdf17_Page52.csv', 'Pdf17_Page53.csv', 'Pdf17_Page54.csv', 'Pdf17_Page55.csv', 'Pdf17_Page56.csv', 'Pdf17_Page57.csv', 'Pdf17_Page58.csv', 'Pdf17_Page59.csv', 'Pdf17_Page60.csv', 'Mix_Pdf17_Page61and62.csv','Pdf17_Page69.csv', 'Pdf17_Page70.csv', 'Pdf17_Page71.csv', 'Pdf17_Page72.csv', 'Pdf17_Page73.csv', 'Pdf17_Page74.csv', 'Mix_Pdf17_Page75and76.csv', 'Pdf17_Page77.csv']
/*兵事*/
const societyMilitary_csv = ['Mix_pdf17_page78and79.csv']

var imgId;
var imgName = "";
var csvName;

async function clickButton(folder){
  $('.a').remove();
  var f = folderCheckCSV(folderName.value);
  var query;
  for(let i = 0; i < folder.length; i++){
      var div = document.createElement("div");
      div.className = "a";

      var img = document.createElement("img");
      img.src = "./public/"+folderName.value+"/jpeg/"+folder[i];
      // console.log("./public/"+folderName.value+"/csv/"+folder[i]);
      query = "./public/"+folderName.value+"/csv/"+f[i];
      console.log(query);

      img.id = i;
      img.onclick = clickImage;

      await db.c_status.where("src")   
        .equals(query)
        .each((data)=>{     // 検索結果を全て取得(ループしない)
          console.log(query);
          console.log(data.backgroundcolor);
          console.log("----")
          div.style.border = "5px solid "+data.backgroundcolor;
        })
      // db.c_status.get(query)   
      //   // データ処理
      //   .then((val)=>{
      //     console.log(val);
      //     div.style.border = val.backgroundcolor;
      //   })
      //   // エラー処理
      //   .catch((error)=>{
      //     console.error(error);
      //   });

      imgsArea.appendChild(div);
      div.appendChild(img);
  }
}

function clickImage(){
    // imgタグに差し込む
    $('#original').remove();
    var target_img = document.createElement("img");
    target_img.src = this.src;
    target_img.id = "original";

    var folder = folderCheckCSV(folderName.value);
    csvName = folder[this.id];
    var path = "./public/"+folderName.value+"/csv/"+folder[this.id];
    csv_data(path);

    imgName = path;
    imgId = this.id;

    imgArea.appendChild(target_img);
}

/**
* CSVの一行を引数に指定すると、
* ""で囲まれた内部のコンマを分割せずに、
* コンマで分割して配列の戻り値を返す関数
* https://qiita.com/hatorijobs/items/dd0c730e6faba0c84203
*/

function csvSplit(line) {
  var c = "";
  var s = new String();
  var data = new Array();
  var singleQuoteFlg = false;

  for (var i = 0; i < line.length; i++) {
    c = line.charAt(i);
    if (c == "," && !singleQuoteFlg) {
      data.push(s.toString());
      s = "";
    } else if (c == "," && singleQuoteFlg) {
      s = s + c;
    } else if (c == '"') {
      singleQuoteFlg = !singleQuoteFlg;
    } else {
      s = s + c;
    }
  }
  return data;
}

function csv_data(dataPath) {
	const request = new XMLHttpRequest(); // HTTPでファイルを読み込む
	request.addEventListener('load', (event) => { // ロードさせ実行
		const response = event.target.responseText; // 受け取ったテキストを返す
		csv_array(response); //csv_arrayの関数を実行
	});
	request.open('GET', dataPath, true); // csvのパスを指定
	request.send();
}

/*
*正規表現 /^[,\s]*$/ 空白またはカンマのみの行を判定する
*https://teratail.com/questions/168574
*/

function csv_array(data) {
	const dataArray = []; //配列を用意
	const dataString = data.split('\n'); //改行で分割
	for (let i = 0; i < dataString.length; i++) { //あるだけループ
		// dataArray[i] = dataString[i].split(',');
    if (/^[,\s]*$/.test(dataString[i])) {
      continue;
    }
    dataArray[i] = this.csvSplit(dataString[i]);
	}
	let insertElement = ''; //テーブルタグに表示する用の変数
	dataArray.forEach((element) => { //配列の中身を表示
		insertElement += '<tr>';
		element.forEach((childElement) => {
      //insertElement += '<th>1</th>'
			insertElement += `<td>${childElement}</td>`
		});
		insertElement += '</tr>';
	});
	output_csv.innerHTML = insertElement; // 表示
}

/*
* Chat GPTによってリファクタリングされたコード
*/

// function csv_array(data) {
//   const dataArray = data.split('\n')
//     .filter(line => line.trim() !== '') // 空白行を削除
//     .map(line => csvSplit(line)); // CSVを分割して2次元配列を作成

//   let insertElement = '';
//   dataArray.forEach(row => {
//     insertElement += '<tr>';
//     row.forEach(cell => {
//       insertElement += `<td>${cell}</td>`;
//     });
//     insertElement += '</tr>';
//   });
//   output_csv.innerHTML = insertElement;
// }

// function csvSplit(line) {
//   return line.split(',');
// }

function folderCheck(folderName) {
  const folderButtonMap = {
    'Ⅰ. 行政 - 気象': adminWeather,
    'Ⅰ. 行政 - 土地': adminLand,
    'Ⅰ. 行政 - 人工': adminPopulation,
    'Ⅰ. 行政 - 財政': adminFinance,
    'Ⅱ. 産業・経済 - 農業': industryAgriculture,
    'Ⅱ. 産業・経済 - 漁業': industryFishing,
    'Ⅱ. 産業・経済 - 露領漁業': industryRussianFishery,
    'Ⅱ. 産業・経済 - 工業': industryIndustry,
    // 'Ⅱ. 産業・経済 - 事業所': industryEstablishments,
    'Ⅱ. 産業・経済 - 商業・金融': industryCommercial,
    'Ⅱ. 産業・経済 - 運輸・通信': industryTransportation,
    'Ⅱ. 産業・経済 - 内国貿易': industryDomesticTrade,
    'Ⅱ. 産業・経済 - 外国貿易': industryForeignTrade,
    'Ⅱ. 産業・経済 - 物価・賃金': industryPrices,
    'Ⅲ. 社会・教育 - 司法・警察': societyJudiciary,
    'Ⅲ. 社会・教育 - 風俗': societyPublicMorals,
    'Ⅲ. 社会・教育 - 消防': societyFirefighting,
    'Ⅲ. 社会・教育 - 衛星': societySatellite,
    'Ⅲ. 社会・教育 - 水道・電気・ガス': societyWater,
    'Ⅲ. 社会・教育 - 教育': societyEducation,
    'Ⅲ. 社会・教育 - 兵事': societyMilitary
  };

  const button = folderButtonMap[folderName];
  if (button) {
    clickButton(button);
  } else {
    console.log('error');
  }
}

function folderCheckCSV(folderName) {
  const folders = {
    'Ⅰ. 行政 - 気象': adminWeather_csv,
    'Ⅰ. 行政 - 土地': adminLand_csv,
    'Ⅰ. 行政 - 人工': adminPopulation_csv,
    'Ⅰ. 行政 - 財政': adminFinance_csv,
    'Ⅱ. 産業・経済 - 農業': industryAgriculture_csv,
    'Ⅱ. 産業・経済 - 漁業': industryFishing_csv,
    'Ⅱ. 産業・経済 - 露領漁業': industryRussianFishery_csv,
    'Ⅱ. 産業・経済 - 工業': industryIndustry_csv,
    // 'Ⅱ. 産業・経済 - 事業所': industryEstablishments_csv,
    'Ⅱ. 産業・経済 - 商業・金融': industryCommercial_csv,
    'Ⅱ. 産業・経済 - 運輸・通信': industryTransportation_csv,
    'Ⅱ. 産業・経済 - 内国貿易': industryDomesticTrade_csv,
    'Ⅱ. 産業・経済 - 外国貿易': industryForeignTrade_csv,
    'Ⅱ. 産業・経済 - 物価・賃金': industryPrices_csv,
    'Ⅲ. 社会・教育 - 司法・警察': societyJudiciary_csv,
    'Ⅲ. 社会・教育 - 風俗': societyPublicMorals_csv,
    'Ⅲ. 社会・教育 - 消防': societyFirefighting_csv,
    'Ⅲ. 社会・教育 - 衛星': societySatellite_csv,
    'Ⅲ. 社会・教育 - 水道・電気・ガス': societyWater_csv,
    'Ⅲ. 社会・教育 - 教育': societyEducation_csv,
    'Ⅲ. 社会・教育 - 兵事': societyMilitary_csv
  };
  
  const folder = folders[folderName];
  if (folder) {
    return typeof folder === 'function' ? folder() : folder;
  }
  
  console.log('error');
  return undefined;
}

function addImageSize(){
  var targetImg = document.getElementById("original");
  var targetWidth  = targetImg.width;
  var targetHeight = targetImg.height;

  targetImg.style.width = targetWidth + 100 + "px";
  targetImg.style.height = targetHeight * (targetImg.width / targetWidth) + "px"; // 高さを横幅の変化割合に合わせる
}

function reduceImageSize(){
  var targetImg = document.getElementById("original");
  var targetWidth  = targetImg.width;
  var targetHeight = targetImg.height;
  
  targetImg.style.width = targetWidth - 100 + "px";
  targetImg.style.height = targetHeight * (targetImg.width / targetWidth) + "px"; // 高さを横幅の変化割合に合わせる
}

folderName.addEventListener('change', function(){
  folderCheck(folderName.value);
});

plusButton.addEventListener('click', addImageSize);
minusButton.addEventListener('click', reduceImageSize);