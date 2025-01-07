package org.example.ims_backend.common;

import org.example.ims_backend.dto.user.menu.response.MenuResponse;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

public class MenuManager {
    private Map<Long, MenuResponse> menuMap = new HashMap<>();
    private Map<Long,MenuResponse> resultMap = new HashMap<>();
    public void addMenu(Long menu_id,String menu_name,String menu_code,int total_task,Long parent_menu_id,int active){
        if(menuMap.containsKey(menu_id)){
            return;
        }
        MenuResponse parent_menu = null;
        if (parent_menu_id != null) {
            parent_menu = menuMap.get(parent_menu_id);
            if (parent_menu == null) {
                return;
            }
        }

        MenuResponse newMenu = new MenuResponse(menu_id,menu_name,menu_code,total_task,parent_menu_id,active);
        menuMap.put(menu_id,newMenu);
        if (parent_menu != null) {
            parent_menu.addSubMenuResponse(newMenu);

        }else{
            resultMap.put(menu_id,newMenu);
        }

    }
    public List<MenuResponse> getAllMenus() {
        return new ArrayList<>(resultMap.values());
    }
}
