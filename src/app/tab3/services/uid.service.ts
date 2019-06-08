export class UidService {

  constructor(

  ) {}

  unique(var1, var2) {

      const tmp = [var1, var2];
      tmp.sort();

      return tmp[0].substring(0, 14) + tmp[1].substring(14, 28);
  }

  simple(var1, var2) {
      return var1.substring(0, 14) + var2.substring(14, 28);
  }

}
