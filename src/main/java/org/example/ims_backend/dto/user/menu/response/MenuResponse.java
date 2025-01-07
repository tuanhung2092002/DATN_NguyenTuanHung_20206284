package org.example.ims_backend.dto.user.menu.response;

import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.*;
import lombok.experimental.FieldDefaults;

import java.util.ArrayList;
import java.util.List;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
@FieldDefaults(level = AccessLevel.PRIVATE)
public class MenuResponse {
    Long menu_id;
    String menu_name;
    String menu_code;
    int total_task;
    Long  parent_menu;
    int active;
    List<MenuResponse> menu_child = new ArrayList<>();
    public MenuResponse(Long menu_id, String menu_name, String menu_code, int total_task, Long parent_menu, int active) {
        this.menu_id = menu_id;
        this.menu_name = menu_name;
        this.menu_code = menu_code;
        this.total_task = total_task;
        this.parent_menu= parent_menu;
        this.active = active;
    }
    public void addSubMenuResponse(MenuResponse child_menu) {
        if (this.menu_child == null) {
            this.menu_child = new ArrayList<>();
        }
        // Avoid adding duplicates
        if (!this.menu_child.contains(child_menu)) {
            this.menu_child.add(child_menu);
        }
    }

}
