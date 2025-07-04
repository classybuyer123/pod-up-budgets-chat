
interface UserTokens {
  accessToken: string;
  itemId: string;
}

let userTokensStorage: UserTokens | null = null;

export const linkBank = async (): Promise<{ success: boolean; message: string }> => {
  try {
    // Simulate bank linking process
    const mockTokens: UserTokens = {
      accessToken: 'mock_access_token_' + Date.now(),
      itemId: 'mock_item_id_' + Date.now()
    };
    
    userTokensStorage = mockTokens;
    
    return {
      success: true,
      message: 'Bank account linked successfully!'
    };
  } catch (error) {
    return {
      success: false,
      message: 'Failed to link bank account'
    };
  }
};

export const getUserTokens = (): UserTokens | null => {
  return userTokensStorage;
};
