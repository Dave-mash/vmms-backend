// Platinum, Gold, Silver, Bronze

class PlatinumPlan {
  private planName: string;
  private totalBackupLimit: string;
  private totalVMlimit: string;
  private constPerAnnum: string;
  constructor() {
    this.planName = 'Platinum';
    this.totalBackupLimit = '10';
    this.totalVMlimit = '10';
    this.constPerAnnum = '70000';
  }
}

class GoldPlan {
  private planName: string;
  private totalBackupLimit: string;
  private totalVMlimit: string;
  private constPerAnnum: string;
  constructor() {
    this.planName = 'Gold';
    this.totalBackupLimit = '5';
    this.totalVMlimit = '5';
    this.constPerAnnum = '60000';
  }
}

class SilverPlan {
  private planName: string;
  private totalBackupLimit: string;
  private totalVMlimit: string;
  private constPerAnnum: string;
  constructor() {
    this.planName = 'Silver';
    this.totalBackupLimit = '2';
    this.totalVMlimit = '2';
    this.constPerAnnum = '50000';
  }
}

class BronzePlan {
  private planName: string;
  private totalBackupLimit: string;
  private totalVMlimit: string;
  private constPerAnnum: string;
  constructor() {
    this.planName = 'Bronze';
    this.totalBackupLimit = '1';
    this.totalVMlimit = '1';
    this.constPerAnnum = '40000';
  }
}

export const ratePlans = {
  platinum: PlatinumPlan,
  gold: GoldPlan,
  silver: SilverPlan,
  bronze: BronzePlan,
};

export const generateRandomNumberString = () => {
  let result = '';
  const characters = '0123456789';

  for (let i = 0; i < 5; i++) {
    result += characters.charAt(Math.floor(Math.random() * characters.length));
  }

  return result;
};
