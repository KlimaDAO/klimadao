export class MethodologyCategories {
  static map: Map<string, string> | null = null

  /**
   * Gets a category based on methodology of an offset.
   * Since there are occurences of multiple methodologies separated by comma, if methodology is not found initially within a map, methodology is split into array.
   * That array will be iterated and checked if category for each methodology in array exists.
   * @param methodology Methodology of an offset
   * @returns
   */
  public static getMethodologyCategory(methodology: string): string {
    const map = this.getMap()
    if (map == null) {
      throw new Error('Map cannot be null')
    }
    if (map.has(methodology)) {
      return map.get(methodology)
    }

    const methodologyArray = methodology.split(',')
    const categories = this.getCategoriesFromMultipleMethodologies(methodologyArray, map)
    return categories
  }

  private static getCategoriesFromMultipleMethodologies(methodologyArray: string[], map: Map<string, string>): string {
    let categories: string = ''
    for (let i = 0; i < methodologyArray.length; i++) {
      const currentMethodology = methodologyArray[i].trim()
      if (!map.has(currentMethodology)) {
        continue
      }
      if (categories.length > 0) {
        let category = '' + map.get(currentMethodology)
        if (categories.includes(category)) {
          continue
        }
        categories += ', '
      }
      categories += map.get(currentMethodology)
    }
    return categories
  }

  private static getMap(): Map<string, string> | null {
    if (this.map == null) {
      this.map = this.loadMap()
    }
    return this.map
  }

  private static loadMap(): Map<string, string> {
    const map = new Map<string, string>()

    //Renewable Energy
    map.set('AM0103', 'Renewable Energy')
    map.set('ACM0002', 'Renewable Energy')
    map.set('AMS-I.D.', 'Renewable Energy')
    map.set('AMS-I.C.', 'Renewable Energy')
    map.set('AMS-ID', 'Renewable Energy')
    map.set('AMS-IC', 'Renewable Energy')
    map.set('AMS-IF', 'Renewable Energy')
    map.set('ACM0017', 'Renewable Energy')
    map.set('ACM0018', 'Renewable Energy')
    map.set('ME-ER01', 'Renewable Energy')
    map.set('AMS-IL', 'Renewable Energy')

    //Energy Efficiency
    map.set('AM0014', 'Energy Efficiency')
    map.set('AM0038', 'Energy Efficiency')
    map.set('AM0043', 'Energy Efficiency')
    map.set('AM0044', 'Energy Efficiency')
    map.set('AM0046', 'Energy Efficiency')
    map.set('AM0055', 'Energy Efficiency')
    map.set('AM0055', 'Energy Efficiency')
    map.set('AM0056', 'Energy Efficiency')
    map.set('AM0061', 'Energy Efficiency')
    map.set('AM0062', 'Energy Efficiency')
    map.set('AM0067', 'Energy Efficiency')
    map.set('AM0091', 'Energy Efficiency')
    map.set('AM0105', 'Energy Efficiency')
    map.set('AM0106', 'Energy Efficiency')
    map.set('AM0113', 'Energy Efficiency')
    map.set('AM0114', 'Energy Efficiency')
    map.set('AM0115', 'Energy Efficiency')
    map.set('AM0116', 'Energy Efficiency')
    map.set('AM0117', 'Energy Efficiency')
    map.set('AM0118', 'Energy Efficiency')
    map.set('AM0119', 'Energy Efficiency')
    map.set('AM0120', 'Energy Efficiency')
    map.set('AM0121', 'Energy Efficiency')
    map.set('VM0008', 'Energy Efficiency')
    map.set('VM0018', 'Energy Efficiency')
    map.set('VM0019', 'Energy Efficiency')
    map.set('VM0020', 'Energy Efficiency')
    map.set('VM0025', 'Energy Efficiency')
    map.set('VMR0005', 'Energy Efficiency')
    map.set('VMR0006', 'Energy Efficiency')
    map.set('VM0001', 'Energy Efficiency')
    map.set('VM0002', 'Energy Efficiency')
    map.set('VM0008', 'Energy Efficiency')
    map.set('VM0019', 'Energy Efficiency')
    map.set('VM0020', 'Energy Efficiency')
    map.set('VM0018', 'Energy Efficiency')
    map.set('ACM0012', 'Energy Efficiency')
    map.set('AMS-III.Z', 'Energy Efficiency')
    map.set('GS TPDDTEC v 1.', 'Energy Efficiency')
    map.set('AMS-II.G.', 'Energy Efficiency')
    map.set('AMS-IIIZ', 'Energy Efficiency')
    map.set('AMS-IIG', 'Energy Efficiency')
    map.set('AMS-IIB', 'Energy Efficiency')
    map.set('ACM0007', 'Energy Efficiency')


    //Agriculture
    map.set('VM0041', 'Agriculture')
    map.set('VM0042', 'Agriculture')
    map.set('VM0017', 'Agriculture')
    map.set('VMR0003', 'Agriculture')
    map.set('AMS-III.AU.', 'Agriculture')
    map.set('AMS-III.BE', 'Agriculture')
    map.set('AMS-III.BF', 'Agriculture')
    map.set('VM0017', 'Agriculture')
    map.set('AMS-III.D.', 'Agriculture')
    map.set('ACM0010', 'Agriculture')
    map.set('GS402', 'Agriculture')
    map.set('C04000000', 'Agriculture')

    //Forestry
    map.set('VM0004', 'Forestry')
    map.set('VM0007', 'Forestry')
    map.set('VM0024', 'Forestry')
    map.set('VM0027', 'Forestry')
    map.set('VM0036', 'Forestry')
    map.set('VM0003', 'Forestry')
    map.set('VM0004', 'Forestry')
    map.set('VM0005', 'Forestry')
    map.set('VM0006', 'Forestry')
    map.set('VM0007', 'Forestry')
    map.set('VM0009', 'Forestry')
    map.set('VM0010', 'Forestry')
    map.set('VM0011', 'Forestry')
    map.set('VM0012', 'Forestry')
    map.set('VM0015', 'Forestry')
    map.set('VM0029', 'Forestry')
    map.set('VM0034', 'Forestry')
    map.set('VM0035', 'Forestry')
    map.set('VM0037', 'Forestry')
    map.set('AR-ACM0003', 'Forestry')
    map.set('AR-AMS0003', 'Forestry')
    map.set('AR-AMS0007', 'Forestry')
    map.set('AR-ACM0001', 'Forestry')
    map.set('FCC', 'Forestry')
    map.set('MLU-REDD+', 'Forestry')
    map.set('MLUF-W01', 'Forestry')
    map.set('MUT-REDD+', 'Forestry')
    map.set('NTC-6208', 'Forestry')
    map.set('MUTF-A01', 'Forestry')

    // Blue Carbon
    map.set('AR-AM0014', 'Blue Carbon')
    map.set('VM0033', 'Blue Carbon')

    //Other nature based
    map.set('VM0021', 'Other Nature-Based')
    map.set('VM0026', 'Other Nature-Based')
    map.set('VM0032', 'Other Nature-Based')
    map.set('AM0010', 'Other Nature Based')

    //Industrial processing
    map.set('AM0048', 'Industrial Processing')
    map.set('AM0050', 'Industrial Processing')
    map.set('AM0059', 'Industrial Processing')
    map.set('AM0092', 'Industrial Processing')
    map.set('AM0095', 'Industrial Processing')
    map.set('AM0096', 'Industrial Processing')
    map.set('AMS-III.M.', 'Industrial Processing')
    map.set('AM0025', 'Industrial Processing')
    map.set('AMS-III.AJ.', 'Industrial Processing')
    map.set('AMS-IID', 'Industrial Processing')

    //Biochar
    map.set('C03000000', 'Biochar')

    //Construction
    map.set('C09000000', 'Construction')
    map.set('C02000000', 'Construction')
    map.set('C01000000', 'Construction')

    //Other
    map.set('AM0052', 'Other')
    map.set('AM0053', 'Other')
    map.set('AM0057', 'Other')
    map.set('AM0058', 'Other')
    map.set('AM0064', 'Other')
    map.set('AM0065', 'Other')
    map.set('AM0066', 'Other')
    map.set('AM0069', 'Other')
    map.set('AM0070', 'Other')
    map.set('AM0070', 'Other')
    map.set('AM0072', 'Other')
    map.set('AM0073', 'Other')
    map.set('AM0074', 'Other')
    map.set('AM0075', 'Other')
    map.set('AM0076', 'Other')
    map.set('AM0077', 'Other')
    map.set('AM0078', 'Other')
    map.set('AM0079', 'Other')
    map.set('AM0080', 'Other')
    map.set('AM0081', 'Other')
    map.set('AM0082', 'Other')
    map.set('AM0083', 'Other')
    map.set('AM0084', 'Other')
    map.set('AM0086', 'Other')
    map.set('AM0088', 'Other')
    map.set('AM0089', 'Other')
    map.set('AM0090', 'Other')
    map.set('AM0093', 'Other')
    map.set('AM0094', 'Other')
    map.set('AM0097', 'Other')
    map.set('AM0098', 'Other')
    map.set('AM0100', 'Other')
    map.set('AM0104', 'Other')
    map.set('AM0107', 'Other')
    map.set('AM0108', 'Other')
    map.set('AM0109', 'Other')
    map.set('AM0110', 'Other')
    map.set('AM0112', 'Other')
    map.set('AM0122', 'Other')
    map.set('VM0013', 'Other')
    map.set('VM0040', 'Other')
    map.set('VMR0004', 'Other')
    map.set('VM0014', 'Other')
    map.set('VM0016', 'Other')
    map.set('VM0023', 'Other')
    map.set('VM0030', 'Other')
    map.set('VM0031', 'Other')
    map.set('VM0040', 'Other')
    map.set('VM0043', 'Other')
    map.set('VM0039', 'Other')
    map.set('VMR0004', 'Other')
    map.set('VMR0001', 'Other')
    map.set('VMR0002', 'Other')
    map.set('ACM0001', 'Other')
    map.set('ACM0006', 'Other')
    map.set('AM0029', 'Other')
    map.set('AM0001', 'Other')
    map.set('AMS-III.G.', 'Other')
    map.set('AM0009', 'Other')
    map.set('AMS-III.H.', 'Other')
    map.set('AMS-III.H', 'Other')
    map.set('ISO 14064-2', 'Other')
    map.set('C10000000', 'Other')

    return map
  }
}
