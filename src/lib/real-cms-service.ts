// Servicio CMS temporal
export interface Announcement {
  id: string;
  title: string;
  content: string;
  type: string;
  action_text?: string;
  action_url?: string;
}

const realCMSService = {
  async getActiveAnnouncements() {
    return [];
  }
};

export default realCMSService;
