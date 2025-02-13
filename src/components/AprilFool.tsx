import React, { useEffect, useRef, useState } from "react";
import { useTiming } from "@src/utils/useTiming";

interface Fish {
	x: number;
	y: number;
	size: number;
	speedX: number;
	speedY: number;
	direction: number;
	rotation: number;
	colors: string[];

	update: () => void;
	draw: (ctx: CanvasRenderingContext2D) => void;
	isOutOfScreen: (height: number) => boolean;
}

const FishPaths: [Path2D, [number, number]][] = [
	[new Path2D("M0 0 C1.48250748 0.00081573 1.48250748 0.00081573 2.9949646 0.00164795 C19.38353305 0.0429777 35.16165384 1.01360203 51.25 4.375 C52.77512207 4.68848389 52.77512207 4.68848389 54.33105469 5.00830078 C106.00985224 15.99066225 153.35279115 42.84016675 192.08203125 78.390625 C194.72743918 80.81200739 197.44005241 83.14890476 200.16796875 85.4765625 C202.25 87.375 202.25 87.375 203.59785461 88.93852234 C208.45350734 94.3670134 213.43062068 96.45878703 220.25 98.73046875 C221.33319016 99.10998184 222.41638031 99.48949493 223.53239441 99.88050842 C227.09888508 101.12606057 230.67424673 102.34382364 234.25 103.5625 C236.76557723 104.43680184 239.2804297 105.31289797 241.79418945 106.19238281 C245.69590583 107.55649494 249.59791978 108.91963748 253.50300598 110.27407837 C265.71974614 114.51399285 277.871519 118.92582798 290.01461792 123.37210083 C315.03710088 132.53123848 340.12669828 141.49665673 365.25 150.375 C363.8817775 153.45584689 362.34180505 155.50908828 359.92095947 157.84361267 C359.23377335 158.51187073 358.54658722 159.18012878 357.83857727 159.86863708 C357.08521591 160.59124222 356.33185455 161.31384735 355.55566406 162.05834961 C353.91110078 163.65358424 352.26667782 165.24896355 350.62237549 166.84446716 C349.31268673 168.1101695 349.31268673 168.1101695 347.97653961 169.40144157 C343.35831028 173.87484638 338.77355997 178.38239806 334.18359375 182.88476562 C328.34174326 188.61378422 322.49000737 194.33148569 316.59619141 200.00708008 C311.83309727 204.59404956 307.11026035 209.22003719 302.40911102 213.87060738 C300.61222861 215.63478606 298.80195049 217.38542841 296.97827911 219.12190056 C287.02749122 227.77046 287.02749122 227.77046 281.58375549 239.18469238 C282.07665218 242.55072245 282.92752363 245.25257246 284.25 248.375 C284.46068115 249.65971191 284.6713623 250.94442383 284.88842773 252.26806641 C285.06833252 253.32687012 285.2482373 254.38567383 285.43359375 255.4765625 C285.63476807 256.69520996 285.83594238 257.91385742 286.04321289 259.16943359 C286.4864936 261.80492974 286.9469411 264.43255152 287.42749023 267.06103516 C288.61620325 273.7812459 289.38380942 279.93817355 288.9765625 286.796875 C288.69307149 293.83105661 288.46725888 300.20716963 292.25 306.375 C300.55755315 314.04298869 312.939045 317.55864767 323.31298828 321.45849609 C330.11806321 324.04651405 336.6342996 327.20078127 343.18029785 330.37582397 C346.65253963 332.05209452 350.14570508 333.68360166 353.63671875 335.3203125 C355.05139942 335.98572653 356.46594903 336.65141926 357.88037109 337.31738281 C358.59304138 337.65290161 359.30571167 337.98842041 360.03997803 338.33410645 C379.79650083 347.63918916 399.54472166 356.96179779 419.25 366.375 C419.25 370.8486915 418.53503713 371.55795928 415.5334177 374.60790753 C414.98090304 375.14877083 414.42838839 375.68963412 413.85913086 376.24688721 C413.27926642 376.83016934 412.69940199 377.41345148 412.1019659 378.01440883 C410.14898464 379.97399893 408.18201064 381.91891613 406.21484375 383.86425781 C404.81498793 385.26298581 403.41601139 386.66259428 402.01785278 388.0630188 C398.21283125 391.86919094 394.39557681 395.66287953 390.57606888 399.45450687 C386.58908295 403.41653709 382.61337453 407.38985016 378.63647461 411.36199951 C371.10085532 418.8851719 363.55509487 426.39808739 356.0056715 433.90740466 C347.41272658 442.45568532 338.83109754 451.0152873 330.25041771 459.57587671 C312.59620717 477.18824408 294.9277769 494.78628888 277.25 512.375 C274.25 511.375 274.25 511.375 272.73876953 508.86010742 C272.20880371 507.74482666 271.67883789 506.6295459 271.1328125 505.48046875 C270.83984283 504.8707724 270.54687317 504.26107605 270.24502563 503.63290405 C269.2782792 501.61406988 268.32659249 499.58851585 267.375 497.5625 C266.69769193 496.13953448 266.01962184 494.71693144 265.34082031 493.29467773 C260.63974059 483.42044945 256.02916334 473.50322821 251.44775391 463.57299805 C248.22778688 456.60158014 244.967531 449.65082306 241.671875 442.71484375 C241.07326157 441.45074173 241.07326157 441.45074173 240.46255493 440.16110229 C238.40899978 435.83169122 236.33264255 431.51594622 234.21044922 427.21972656 C230.42945482 419.5092122 226.9545949 412.0376802 224.5859375 403.76953125 C221.34700095 392.92275396 221.34700095 392.92275396 214.25 384.375 C204.11389677 379.87561528 191.87891349 380.11123684 180.98905945 379.74992371 C172.91421784 379.46444273 165.33455493 378.1889177 157.4375 376.5 C155.32829744 376.05800827 153.21774265 375.62238521 151.10546875 375.1953125 C150.25621826 375.01242676 149.40696777 374.82954102 148.53198242 374.64111328 C146.01834586 374.34798566 144.63416055 374.5516496 142.25 375.375 C140.41136457 376.77854405 140.41136457 376.77854405 138.66940308 378.60829163 C137.97683411 379.29962692 137.28426514 379.99096222 136.57070923 380.70324707 C135.82147186 381.46641235 135.0722345 382.22957764 134.30029297 383.01586914 C133.50312866 383.81580795 132.70596436 384.61574677 131.88464355 385.43992615 C129.24694466 388.08992748 126.61979928 390.75015607 123.9921875 393.41015625 C122.16503363 395.2479812 120.33707081 397.08500223 118.5083313 398.92124939 C113.1992658 404.2554638 107.90055462 409.59986754 102.60333252 414.94583893 C95.39756978 422.21656836 88.18389772 429.47939064 80.96292496 436.73501396 C78.26291254 439.45180244 75.56937187 442.17489498 72.87619019 444.89845276 C71.23136096 446.55373687 69.58628388 448.20877475 67.94091797 449.86352539 C67.18763214 450.6287149 66.43434631 451.39390442 65.65823364 452.18228149 C64.97130432 452.87079697 64.284375 453.55931244 63.57662964 454.26869202 C62.9789723 454.8720894 62.38131496 455.47548677 61.7655468 456.09716892 C60.25 457.375 60.25 457.375 58.25 457.375 C57.83975586 456.2089624 57.42951172 455.0429248 57.00683594 453.84155273 C47.77287591 427.61283001 38.44576682 401.42025612 28.85229492 375.32055664 C24.94587881 364.67303619 21.09560238 354.01635146 17.46643066 343.27061462 C15.82718783 338.41909614 14.16205378 333.57660773 12.49676514 328.73397827 C11.71938579 326.44701342 10.95544735 324.15542665 10.20635986 321.85903931 C5.54707788 307.58504471 0.87090591 298.00878345 -10.75 288.375 C-13.21573427 285.81018681 -15.48409895 283.1172027 -17.75 280.375 C-18.1924707 279.84632324 -18.63494141 279.31764648 -19.09082031 278.77294922 C-32.37846122 262.86986768 -44.35894991 246.31388697 -54.75 228.375 C-55.47485596 227.1387085 -55.47485596 227.1387085 -56.21435547 225.87744141 C-71.07391762 200.36038658 -81.40353164 172.8560777 -87.5625 144 C-87.75763184 143.08645752 -87.95276367 142.17291504 -88.15380859 141.23168945 C-91.34344306 125.34685937 -92.15712645 109.66283207 -92.125 93.5 C-92.12478851 92.51420959 -92.12457703 91.52841919 -92.12435913 90.51275635 C-92.07733362 68.48564821 -89.75199077 47.43020215 -83.2734375 26.29492188 C-82.64713632 24.15807052 -82.64713632 24.15807052 -82.28125 21.015625 C-81.64816423 17.57089361 -81.12308791 15.98083307 -78.75 13.375 C-66.73638431 6.69427263 -51.21521716 4.44328772 -37.75 2.375 C-36.62770996 2.19839844 -35.50541992 2.02179687 -34.34912109 1.83984375 C-22.89914761 0.21140308 -11.55346373 -0.02398417 0 0 Z"), [91.75,-0.375]],
	[new Path2D("M0 0 C1.48250748 0.00081573 1.48250748 0.00081573 2.9949646 0.00164795 C19.38353305 0.0429777 35.16165384 1.01360203 51.25 4.375 C52.77512207 4.68848389 52.77512207 4.68848389 54.33105469 5.00830078 C106.00985224 15.99066225 153.35279115 42.84016675 192.08203125 78.390625 C194.72743918 80.81200739 197.44005241 83.14890476 200.16796875 85.4765625 C202.25 87.375 202.25 87.375 203.59785461 88.93852234 C208.45350734 94.3670134 213.43062068 96.45878703 220.25 98.73046875 C221.33319016 99.10998184 222.41638031 99.48949493 223.53239441 99.88050842 C227.09888508 101.12606057 230.67424673 102.34382364 234.25 103.5625 C236.76557723 104.43680184 239.2804297 105.31289797 241.79418945 106.19238281 C245.69590583 107.55649494 249.59791978 108.91963748 253.50300598 110.27407837 C265.71974614 114.51399285 277.871519 118.92582798 290.01461792 123.37210083 C315.03710088 132.53123848 340.12669828 141.49665673 365.25 150.375 C363.8817775 153.45584689 362.34180505 155.50908828 359.92095947 157.84361267 C359.23377335 158.51187073 358.54658722 159.18012878 357.83857727 159.86863708 C357.08521591 160.59124222 356.33185455 161.31384735 355.55566406 162.05834961 C353.91110078 163.65358424 352.26667782 165.24896355 350.62237549 166.84446716 C349.31268673 168.1101695 349.31268673 168.1101695 347.97653961 169.40144157 C343.35831028 173.87484638 338.77355997 178.38239806 334.18359375 182.88476562 C328.34174326 188.61378422 322.49000737 194.33148569 316.59619141 200.00708008 C311.83309727 204.59404956 307.11026035 209.22003719 302.40911102 213.87060738 C300.61222861 215.63478606 298.80195049 217.38542841 296.97827911 219.12190056 C287.03172641 227.7672347 287.03172641 227.7672347 281.58251953 239.17480469 C282.0757783 242.5421981 282.93214838 245.2489033 284.25 248.375 C284.67730713 250.53630066 284.67730713 250.53630066 284.90429688 252.39501953 C285.09056641 253.50474121 285.27683594 254.61446289 285.46875 255.7578125 C290.08475535 283.56231004 292.43350813 310.7126676 292.38037109 338.91821289 C292.3749698 342.33158732 292.38037193 345.74483245 292.38671875 349.15820312 C292.3860585 351.36458362 292.38477843 353.57096403 292.3828125 355.77734375 C292.38483673 356.77966537 292.38686096 357.781987 292.38894653 358.81468201 C292.33017068 376.75474398 292.33017068 376.75474398 289.25 381.375 C232.16 324.285 175.07 267.195 116.25 208.375 C118.0216155 204.83176901 119.05002089 203.3963946 121.8125 200.8125 C126.72960293 196.00133107 131.01348056 190.78506147 135.25 185.375 C135.69859375 184.80813477 136.1471875 184.24126953 136.609375 183.65722656 C156.03771618 160.84578821 156.03771618 160.84578821 166.25 134.375 C165.56897217 134.05225098 164.88794434 133.72950195 164.1862793 133.39697266 C161.10220213 131.93372629 158.01983773 130.46690671 154.9375 129 C153.86564453 128.49210938 152.79378906 127.98421875 151.68945312 127.4609375 C150.14741211 126.72617188 150.14741211 126.72617188 148.57421875 125.9765625 C147.62635498 125.52619629 146.67849121 125.07583008 145.7019043 124.61181641 C143.25 123.375 143.25 123.375 140.25 121.375 C139.99476563 122.22835937 139.73953125 123.08171875 139.4765625 123.9609375 C131.33568018 146.62059084 112.50002576 168.89164205 95.25 185.375 C92.33803126 184.05896828 90.2757655 182.64675509 88.02954102 180.3815918 C87.42533829 179.77723801 86.82113556 179.17288422 86.19862366 178.55021667 C85.55686691 177.89813736 84.91511017 177.24605804 84.25390625 176.57421875 C83.2480674 175.56413506 83.2480674 175.56413506 82.22190857 174.53364563 C80.08069241 172.38125258 77.94652308 170.22202262 75.8125 168.0625 C74.38001983 166.61998324 72.94708203 165.17792078 71.51367188 163.73632812 C68.33860222 160.54164746 65.16796879 157.34263831 62.00123596 154.13969421 C59.75718987 151.87840262 57.50352927 149.62684075 55.25 147.375 C36.58333333 128.70833333 17.91666667 110.04166667 -0.75 91.375 C-3.93086518 92.88446511 -6.04869906 94.45441825 -8.5 97 C-9.11359375 97.63164063 -9.7271875 98.26328125 -10.359375 98.9140625 C-10.81828125 99.39617187 -11.2771875 99.87828125 -11.75 100.375 C-15.41752005 98.8358199 -17.73580573 96.62014548 -20.515625 93.8046875 C-21.40507813 92.90878906 -22.29453125 92.01289062 -23.2109375 91.08984375 C-24.13132813 90.15269531 -25.05171875 89.21554688 -26 88.25 C-26.94484856 87.29511363 -27.89015633 86.34068141 -28.8359375 85.38671875 C-31.14518338 83.05390913 -33.44963203 80.71655914 -35.75 78.375 C-34.24053489 75.19413482 -32.67058175 73.07630094 -30.125 70.625 C-29.49335937 70.01140625 -28.86171875 69.3978125 -28.2109375 68.765625 C-27.48777344 68.07726562 -27.48777344 68.07726562 -26.75 67.375 C-28.3097899 63.63315246 -30.61732173 61.26597222 -33.47509766 58.42285156 C-33.95331467 57.9443425 -34.43153168 57.46583344 -34.92424011 56.9728241 C-36.49948483 55.39896805 -38.08168535 53.83230707 -39.6640625 52.265625 C-40.76023213 51.17318714 -41.85595981 50.08030566 -42.95126343 48.98699951 C-45.83039888 46.11548758 -48.71549056 43.25003346 -51.60186768 40.38580322 C-54.54809815 37.46005874 -57.48865069 34.52861986 -60.4296875 31.59765625 C-66.19758588 25.85118518 -71.97178964 20.11110194 -77.75 14.375 C-76.75 12.375 -76.75 12.375 -73.19921875 11.0078125 C-71.61572972 10.49351401 -70.02811325 9.99182306 -68.4375 9.5 C-67.58953857 9.23606445 -66.74157715 8.97212891 -65.86791992 8.70019531 C-59.82165271 6.87570376 -53.75298967 5.37101494 -47.5625 4.125 C-46.44524536 3.89901123 -46.44524536 3.89901123 -45.30541992 3.66845703 C-42.79253586 3.19126939 -40.27667207 2.77316093 -37.75 2.375 C-36.06221436 2.10792236 -36.06221436 2.10792236 -34.34033203 1.83544922 C-22.89408701 0.20857913 -11.5494646 -0.02397586 0 0 Z"), [91.75,-0.375]],
	[new Path2D("M0 0 C1.48250748 0.00081573 1.48250748 0.00081573 2.9949646 0.00164795 C19.38353305 0.0429777 35.16165384 1.01360203 51.25 4.375 C52.77512207 4.68848389 52.77512207 4.68848389 54.33105469 5.00830078 C75.00435928 9.40162482 95.0365394 16.61036234 114.25 25.375 C116.26487897 66.34420567 94.44749352 109.04917822 68.74365234 139.58886719 C66.60010671 142.15215255 64.51813503 144.76039669 62.4375 147.375 C61.81230469 148.15875 61.18710938 148.9425 60.54296875 149.75 C60.11628906 150.28625 59.68960938 150.8225 59.25 151.375 C39.25 131.375 19.25 111.375 -0.75 91.375 C-3.93086518 92.88446511 -6.04869906 94.45441825 -8.5 97 C-9.11359375 97.63164063 -9.7271875 98.26328125 -10.359375 98.9140625 C-10.81828125 99.39617187 -11.2771875 99.87828125 -11.75 100.375 C-15.41752005 98.8358199 -17.73580573 96.62014548 -20.515625 93.8046875 C-21.40507813 92.90878906 -22.29453125 92.01289062 -23.2109375 91.08984375 C-24.13132813 90.15269531 -25.05171875 89.21554688 -26 88.25 C-26.94484856 87.29511363 -27.89015633 86.34068141 -28.8359375 85.38671875 C-31.14518338 83.05390913 -33.44963203 80.71655914 -35.75 78.375 C-34.24053489 75.19413482 -32.67058175 73.07630094 -30.125 70.625 C-29.49335937 70.01140625 -28.86171875 69.3978125 -28.2109375 68.765625 C-27.48777344 68.07726562 -27.48777344 68.07726562 -26.75 67.375 C-28.3097899 63.63315246 -30.61732173 61.26597222 -33.47509766 58.42285156 C-33.95331467 57.9443425 -34.43153168 57.46583344 -34.92424011 56.9728241 C-36.49948483 55.39896805 -38.08168535 53.83230707 -39.6640625 52.265625 C-40.76023213 51.17318714 -41.85595981 50.08030566 -42.95126343 48.98699951 C-45.83039888 46.11548758 -48.71549056 43.25003346 -51.60186768 40.38580322 C-54.54809815 37.46005874 -57.48865069 34.52861986 -60.4296875 31.59765625 C-66.19758588 25.85118518 -71.97178964 20.11110194 -77.75 14.375 C-76.75 12.375 -76.75 12.375 -73.19921875 11.0078125 C-71.61572972 10.49351401 -70.02811325 9.99182306 -68.4375 9.5 C-67.58953857 9.23606445 -66.74157715 8.97212891 -65.86791992 8.70019531 C-59.82165271 6.87570376 -53.75298967 5.37101494 -47.5625 4.125 C-46.44524536 3.89901123 -46.44524536 3.89901123 -45.30541992 3.66845703 C-42.79253586 3.19126939 -40.27667207 2.77316093 -37.75 2.375 C-36.06221436 2.10792236 -36.06221436 2.10792236 -34.34033203 1.83544922 C-22.89408701 0.20857913 -11.5494646 -0.02397586 0 0 Z"), [91.75,-0.375]],
	[new Path2D("M0 0 C6.28513004 5.18760582 12.00311158 10.87427266 17.74609375 16.6484375 C18.76720048 17.67141306 19.788531 18.69416528 20.81007385 19.71670532 C23.47711353 22.38753361 26.14113436 25.06135282 28.80450439 27.73583984 C31.5312385 30.47286736 34.26086305 33.20700901 36.99023438 35.94140625 C42.32963089 41.29147548 47.66583652 46.64471273 53 52 C51.49053489 55.18086518 49.92058175 57.29869906 47.375 59.75 C46.74335937 60.36359375 46.11171875 60.9771875 45.4609375 61.609375 C44.73777344 62.29773438 44.73777344 62.29773438 44 63 C45.51376081 66.56764285 47.60513129 68.83706287 50.3515625 71.546875 C51.20234375 72.39121094 52.053125 73.23554687 52.9296875 74.10546875 C53.81914063 74.97816406 54.70859375 75.85085937 55.625 76.75 C56.5221875 77.63816406 57.419375 78.52632813 58.34375 79.44140625 C60.55807004 81.63216969 62.77692435 83.81812763 65 86 C68.18086518 84.49053489 70.29869906 82.92058175 72.75 80.375 C73.36359375 79.74335937 73.9771875 79.11171875 74.609375 78.4609375 C75.06828125 77.97882813 75.5271875 77.49671875 76 77 C80.01571255 78.60859504 82.70479614 81.43640365 85.68652344 84.45947266 C86.24306107 85.01571823 86.79959869 85.57196381 87.3730011 86.14506531 C89.20657442 87.98002905 91.03296672 89.82196931 92.859375 91.6640625 C94.13117525 92.93959389 95.40341853 94.21468367 96.67608643 95.48934937 C100.02106258 98.84195395 103.35998851 102.20052173 106.69769287 105.56036377 C110.10602831 108.98917456 113.52004745 112.41231573 116.93359375 115.8359375 C123.62797297 122.55175272 130.31597466 129.27388094 137 136 C126.5113738 158.23704332 88.12197284 174.664651 66.20800781 182.55810547 C54.65678448 186.58960832 43.08412645 189.8383132 31 191.8125 C30.2471875 191.93657227 29.494375 192.06064453 28.71875 192.18847656 C23.12642917 193.02289415 17.64785033 193.12601545 12 193 C3.32616169 172.60081005 -4.17287929 152.36261053 -8.8125 130.625 C-9.00763184 129.71145752 -9.20276367 128.79791504 -9.40380859 127.85668945 C-12.59344306 111.97185937 -13.40712645 96.28783207 -13.375 80.125 C-13.37478851 79.13920959 -13.37457703 78.15341919 -13.37435913 77.13775635 C-13.31780009 50.64507302 -9.95079984 24.73802196 0 0 Z"), [13,13]],
	[new Path2D("M0 0 C11.79870292 -1.72040036 23.59427331 -2.85494738 35.5 -3.5 C36.37848854 -3.54793701 37.25697708 -3.59587402 38.16208649 -3.64526367 C60.53452496 -4.72299901 78.45319775 -2.85549916 95.6484375 12.46875 C101.01919765 17.37788193 106.01050267 22.59268322 110.875 28 C111.47786835 28.66963776 112.08073669 29.33927551 112.70187378 30.02920532 C120.17710675 38.39755556 127.24999246 47.0372148 134 56 C132.70701105 58.84374027 131.34960102 60.89894298 129.13998413 63.1005249 C128.55665817 63.68660019 127.97333221 64.27267548 127.37232971 64.87651062 C126.73431931 65.50733047 126.0963089 66.13815033 125.43896484 66.78808594 C124.76567642 67.46166641 124.092388 68.13524689 123.3986969 68.82923889 C121.17415197 71.05239154 118.94260871 73.26837793 116.7109375 75.484375 C115.16636338 77.02521865 113.62223049 78.56650472 112.07852173 80.10821533 C108.01571302 84.16339037 103.94693378 88.21252324 99.87689209 92.26043701 C95.72420894 96.39265611 91.57718656 100.53054757 87.4296875 104.66796875 C79.29199602 112.78421499 71.14798731 120.89409083 63 129 C60 128 60 128 58.48876953 125.48510742 C57.95880371 124.36982666 57.42883789 123.2545459 56.8828125 122.10546875 C56.58984283 121.4957724 56.29687317 120.88607605 55.99502563 120.25790405 C55.0282792 118.23906988 54.07659249 116.21351585 53.125 114.1875 C52.44769193 112.76453448 51.76962184 111.34193144 51.09082031 109.91967773 C46.38974059 100.04544945 41.77916334 90.12822821 37.19775391 80.19799805 C32.37712973 69.76106331 27.44306706 59.37940659 22.5 49 C16.72765675 36.87413681 10.97567726 24.73978985 5.3125 12.5625 C4.7659375 11.39009766 4.219375 10.21769531 3.65625 9.00976562 C3.16769531 7.95595703 2.67914063 6.90214844 2.17578125 5.81640625 C1.75208252 4.90318604 1.32838379 3.98996582 0.8918457 3.04907227 C0 1 0 1 0 0 Z"), [306,383]],
	[new Path2D("M0 0 C5.88359183 0.66638046 11.13502421 2.72441652 16.6484375 4.76953125 C17.70833893 5.15762466 18.76824036 5.54571808 19.86026001 5.9455719 C22.15976302 6.78799175 24.45842821 7.63270126 26.75634766 8.47943115 C32.32434937 10.53061732 37.89760698 12.56741618 43.47092438 14.60410309 C44.7618809 15.07593739 46.05276877 15.54795958 47.34358978 16.02016449 C61.53619262 21.21190199 75.76387103 26.30388821 90 31.375 C92.33643838 32.20772832 94.67286426 33.04049171 97.00927734 33.87329102 C100.41763594 35.08810991 103.82601847 36.30286118 107.23452759 37.51725769 C118.16230633 41.41159745 129.08226603 45.32760158 140 49.25 C140.83853516 49.55121765 141.67707031 49.8524353 142.54101562 50.16278076 C147.02758223 51.77452423 151.51392103 53.38689976 156 55 C154.62928674 58.07046966 153.06896603 60.1819856 150.69787598 62.55609131 C150.01647049 63.24313644 149.335065 63.93018158 148.63301086 64.63804626 C147.88593369 65.38107498 147.13885651 66.1241037 146.36914062 66.88964844 C145.58202194 67.68027176 144.79490326 68.47089508 143.9839325 69.28547668 C141.37971635 71.89849883 138.76824846 74.50413379 136.15625 77.109375 C134.34756653 78.91940517 132.53918008 80.72973219 130.7310791 82.54034424 C126.94131499 86.33305786 123.14804994 90.12222183 119.35205078 93.90869141 C114.95959092 98.29025171 110.5744037 102.67899183 106.19289446 107.07150054 C101.97933701 111.29521281 97.76018891 115.51330549 93.53862 119.72901154 C91.74131741 121.52497589 89.94551049 123.32243826 88.15119934 125.1213913 C85.649213 127.62842932 83.14095285 130.12901238 80.63085938 132.62792969 C79.51024361 133.75461815 79.51024361 133.75461815 78.36698914 134.90406799 C77.68558365 135.57983383 77.00417816 136.25559967 76.30212402 136.95184326 C75.70924339 137.54396984 75.11636276 138.13609642 74.50551605 138.74616623 C73 140 73 140 71 140 C70.86537354 139.44465576 70.73074707 138.88931152 70.59204102 138.31713867 C58.44326668 88.75881349 38.67245057 42.60796619 3.70703125 4.91796875 C2 3 2 3 0 0 Z"), [301,95]],
	[new Path2D("M0 0 C3.40561525 2.90437789 6.80338218 5.81496934 10.1484375 8.7890625 C31.7819734 27.90543625 56.4851722 41.76994905 83 53 C83.74991211 53.32162109 84.49982422 53.64324219 85.27246094 53.97460938 C102.86340712 61.44419177 121.45596288 66.50523677 140 71 C138.62928674 74.07046966 137.06896603 76.1819856 134.69787598 78.55609131 C134.01647049 79.24313644 133.335065 79.93018158 132.63301086 80.63804626 C131.88593369 81.38107498 131.13885651 82.1241037 130.36914062 82.88964844 C129.58202194 83.68027176 128.79490326 84.47089508 127.9839325 85.28547668 C125.37971635 87.89849883 122.76824846 90.50413379 120.15625 93.109375 C118.34756653 94.91940517 116.53918008 96.72973219 114.7310791 98.54034424 C110.94131499 102.33305786 107.14804994 106.12222183 103.35205078 109.90869141 C98.95959092 114.29025171 94.5744037 118.67899183 90.19289446 123.07150054 C85.97933701 127.29521281 81.76018891 131.51330549 77.53862 135.72901154 C75.74131741 137.52497589 73.94551049 139.32243826 72.15119934 141.1213913 C69.649213 143.62842932 67.14095285 146.12901238 64.63085938 148.62792969 C63.8837822 149.37905533 63.13670502 150.13018097 62.36698914 150.90406799 C61.68558365 151.57983383 61.00417816 152.25559967 60.30212402 152.95184326 C59.70924339 153.54396984 59.11636276 154.13609642 58.50551605 154.74616623 C57 156 57 156 55 156 C54.38463379 154.2509436 54.38463379 154.2509436 53.75683594 152.46655273 C45.31077576 128.47585497 36.77225459 104.52131512 28.0625 80.625 C27.22848214 78.3355428 26.39449781 76.04607338 25.56054688 73.7565918 C24.30646272 70.31403088 23.05234584 66.8714819 21.79812622 63.42897034 C17.508767 51.65450895 13.22291013 39.87881734 8.96090698 28.09442139 C8.15841291 25.87800149 7.35417329 23.66221277 6.54812622 21.44708252 C5.43907541 18.39860899 4.33597227 15.34804837 3.234375 12.296875 C2.90418869 11.39341339 2.57400238 10.48995178 2.23381042 9.55911255 C1.93719009 8.73361908 1.64056976 7.90812561 1.33496094 7.05761719 C1.07551697 6.34192566 0.816073 5.62623413 0.54876709 4.88885498 C0 3 0 3 0 0 Z"), [95,301]],
	[new Path2D("M0 0 C3.46629835 1.48653506 5.69022036 3.45722351 8.328125 6.1328125 C9.12734375 6.93847656 9.9265625 7.74414062 10.75 8.57421875 C11.575 9.41597656 12.4 10.25773438 13.25 11.125 C14.09046875 11.97449219 14.9309375 12.82398438 15.796875 13.69921875 C17.86915683 15.79504923 19.93662393 17.89540713 22 20 C17.24145201 30.05328896 6.39886914 37.11687753 -2.2890625 43.69921875 C-3.86953696 44.90081235 -5.43547357 46.12146373 -7 47.34375 C-14.97719456 53.5000632 -23.36427694 58.83171095 -32 64 C-32.72960937 64.44005371 -33.45921875 64.88010742 -34.2109375 65.33349609 C-36.38151916 66.63441708 -38.56295435 67.9144886 -40.75 69.1875 C-41.41741211 69.58646484 -42.08482422 69.98542969 -42.77246094 70.39648438 C-47.36590778 73.01793733 -47.36590778 73.01793733 -50.01953125 72.94287109 C-53.03401879 71.50771936 -53.63340729 69.42339075 -55.015625 66.43359375 C-55.54414063 65.30888672 -56.07265625 64.18417969 -56.6171875 63.02539062 C-57.15601562 61.84138672 -57.69484375 60.65738281 -58.25 59.4375 C-58.80429688 58.24962891 -59.35859375 57.06175781 -59.9296875 55.83789062 C-61.2994379 52.89765055 -62.65546783 49.95183626 -64 47 C-60.42542235 44.24263585 -56.64369014 42.09171057 -52.6875 39.9375 C-33.27458315 29.15944856 -15.58344818 15.84404096 0 0 Z"), [185,186]],
	[new Path2D("M0 0 C3.66752005 1.5391801 5.98580573 3.75485452 8.765625 6.5703125 C10.09980469 7.91416016 10.09980469 7.91416016 11.4609375 9.28515625 C12.38132813 10.22230469 13.30171875 11.15945312 14.25 12.125 C15.19484856 13.07988637 16.14015633 14.03431859 17.0859375 14.98828125 C19.39518338 17.32109087 21.69963203 19.65844086 24 22 C22.51346494 25.46629835 20.54277649 27.69022036 17.8671875 30.328125 C17.06152344 31.12734375 16.25585938 31.9265625 15.42578125 32.75 C14.58402344 33.575 13.74226563 34.4 12.875 35.25 C12.02550781 36.09046875 11.17601563 36.9309375 10.30078125 37.796875 C8.20495077 39.86915683 6.10459287 41.93662393 4 44 C0.33247995 42.4608199 -1.98580573 40.24514548 -4.765625 37.4296875 C-5.65507813 36.53378906 -6.54453125 35.63789062 -7.4609375 34.71484375 C-8.38132812 33.77769531 -9.30171875 32.84054688 -10.25 31.875 C-11.19484856 30.92011363 -12.14015633 29.96568141 -13.0859375 29.01171875 C-15.39518338 26.67890913 -17.69963203 24.34155914 -20 22 C-18.51346494 18.53370165 -16.54277649 16.30977964 -13.8671875 13.671875 C-12.65869141 12.47304687 -12.65869141 12.47304687 -11.42578125 11.25 C-10.58402344 10.425 -9.74226563 9.6 -8.875 8.75 C-8.02550781 7.90953125 -7.17601563 7.0690625 -6.30078125 6.203125 C-4.20495077 4.13084317 -2.10459287 2.06337607 0 0 Z"), [76,56]],
] as const;

const FishColors: string[][] = [
	["#8CBBFE", "#7C84E8", "#8BBBFE", "#B2D7F4", "#B2D7F4", "#B3D8F4", "#B3D8F4", "#B2D7F4", "#094A60"], // Bleu
	["#FF8C8C", "#FF7C7C", "#FF8B8B", "#FFB2B2", "#FFB2B2", "#FFB3B3", "#FFB3B3", "#FFB2B2", "#FF0909"], // Rouge
	["#A3E4A3", "#99D799", "#8FC08F", "#85B985", "#7BB27B", "#71AB71", "#66A466", "#5CA05C", "#529952"], // Vert
	["#FF8CFF", "#FF7CFF", "#FF8BFF", "#FFB2FF", "#FFB2FF", "#FFB3FF", "#FFB3FF", "#FFB2FF", "#FF09FF"], // Rose
	["#FFB28C", "#FF9B7C", "#FFA58B", "#FFC2B2", "#FFC2B2", "#FFC3B3", "#FFC3B3", "#FFC2B2", "#FF4A09"], // Orange
	["#B28CFF", "#9B7CFF", "#A58BFF", "#C2B2FF", "#C2B2FF", "#C3B3FF", "#C3B3FF", "#C2B2FF", "#4A09FF"], // Violet
	["#FFE4B5", "#FFD700", "#FFC043", "#FFAA16", "#FF9933", "#FF885A", "#FF7781", "#FF66A9", "#FF55D1"], // Jaune
	["#4decec", "#1ecece", "#44DDDD", "#66CCCC", "#88BBBB", "#AAAABB", "#CC99BB", "#EE88BB", "#FF77BB"], // Cyan
] as const;

export const AprilFool = () => {

	const { isExpired, setExpiration } = useTiming("aprilFool");

	const canDisplay = () => {
		const now = Date.now();
		return isExpired() && new Date("04-01-2022").getTime() < now && new Date("04-02-2022").getTime() > now;
	}

	const [display, setDisplay] = useState(canDisplay());
	const canvasRef = useRef<HTMLCanvasElement | null>(null);
	const generationActive = useRef(true);
	const fishesRef = useRef<Fish[]>([]);

	useEffect(() => {
		if (!display) return;
		const canvas = canvasRef.current;
		if (!canvas) return;
		
		const ctx = canvas.getContext("2d");
		if (!ctx) return;

		setExpiration(1);

		canvas.width = window.innerWidth;
		canvas.height = window.innerHeight;

		let anim: number;

		class FishClass implements Fish {
			x: number;
			y: number;
			size: number;
			speedX: number;
			speedY: number;
			direction: number;
			rotation: number;
			colors: string[];

			constructor(x: number, y: number, size: number, speedX: number, speedY: number, direction: number) {
				this.x = x;
				this.y = y;
				this.size = size;
				this.speedX = speedX;
				this.speedY = speedY;
				this.direction = direction;
				this.rotation = this.direction
				this.colors = FishColors[Math.floor(Math.random() * FishColors.length)];
			}

			update() {
				this.x += this.speedX;
				this.y -= this.speedY;
				this.rotation = this.direction + (Math.sin(Date.now() / 100) * Math.PI / 16);
			}

			isOutOfScreen() {
				return this.y < -this.size;
			}

			draw(ctx: CanvasRenderingContext2D) {
				ctx.save();
				ctx.translate(this.x, this.y);
				ctx.scale(this.size / 300, this.size / 300);
				ctx.rotate(this.rotation);

				FishPaths.forEach(([path, [translateX, translateY]], index) => {
					ctx.save();
					ctx.translate(translateX, translateY);
					ctx.fillStyle = this.colors[index % this.colors.length];
					ctx.fill(path);
					ctx.restore();
				});

				ctx.restore();
			}
		}

		const addFish = () => {
			if (fishesRef.current.length < 300 && generationActive.current) {
				const randomStart = Math.random();
				const startFromLeft = randomStart < 0.5;
				const x = randomStart * canvas.width;
				const y = canvas.height + 10; // Commencer en bas de l'écran
				const size = Math.random() * 20 + 10;
				const speedX = (startFromLeft ? 1 : -1) * (Math.random() * 5 + 3);
				const speedY = Math.random() * 5 + 3;
				const rotation = (startFromLeft ? Math.PI / 2 : 0); // Pointer dans la direction souhaitée avec un peu de random
				fishesRef.current.push(new FishClass(x, y, size, speedX, speedY, rotation));
			}
		};

		const animate = () => {
			if (!ctx) return;
			console.log("animate");

			ctx.clearRect(0, 0, canvas.width, canvas.height);

			fishesRef.current.forEach((fish, index) => {
				if (fish.isOutOfScreen(canvas.height)) {
					fishesRef.current.splice(index, 1);
				}
			});

			fishesRef.current.forEach((fish) => {
				fish.update();
				fish.draw(ctx);
			});

			if (fishesRef.current.length > 0 || generationActive.current) {
				anim = requestAnimationFrame(animate);
			} else {
				setDisplay(false);
			}
		};

		animate();

		const generationInterval = setInterval(addFish, 10);

		setTimeout(() => {
			generationActive.current = false;
			clearInterval(generationInterval);
		}, 2000);

		const handleResize = () => {
			canvas.width = window.innerWidth;
			canvas.height = window.innerHeight;
		};
		window.addEventListener("resize", handleResize);

		return () => {
			window.removeEventListener("resize", handleResize);
			clearInterval(generationInterval);
			cancelAnimationFrame(anim);
		};
	}, []);

	return display && <canvas ref={canvasRef} style={{ pointerEvents: "none", display: "block", position: "fixed", top: 0, left: 0, bottom: 0, right: 0, zIndex: 10000 }} />;
};